import { Hono } from "hono";
import findTagsByUserId from "./tags.query.js";
import type { AuthEnv } from "#/types/auth-env.js";
import { zValidator } from "@hono/zod-validator";
import { tagCreateValidation } from "./tag.create.validation.js";
import type { TagClientPayload } from "./tag.types.js";

const tagsRouter = new Hono<AuthEnv>().get('/', async (c) => {
    try {
        const rows = await findTagsByUserId(c.get('user').id)

        const tags: TagClientPayload[] = [...rows];

        return c.json({
            success: true as const,
            tags: tags,
        }, 200);

    } catch (e) {
        console.log('api/v1/templates/tags error while sending tags filtered by user');
        return c.json({
            success: false as const,
            errors: [{ message: 'Internal server error' }]
        }, 500)
    }
})
    .post('/', zValidator(
        'json',
        tagCreateValidation,
        (result, c) => {
            if (!result.success) return c.json({
                success: false as const,
                errors: result.error.issues.map(issue => ({
                    field: issue.path.join('.'),
                    message: issue.message
                }))
            }, 400)
        }
    ),
        async (c) => {
            try {
                const data = await c.req.valid('json');

            } catch (e) {
                console.error(e);
                return c.json({
                    success: false as const,
                    errors: [{ message: 'Internal server error' }]
                }, 500)
            }
        }
    )

export default tagsRouter;