import { Hono } from "hono";
import findTagsByUserId from "./tags.query.js";
import type { AuthEnv } from "#/types/auth-env.js";

export const tagsRouter = new Hono<AuthEnv>();

tagsRouter.get('/', async (c) => {
    try {
        const rows = await findTagsByUserId(c.get('user').id)

        const [tags] = rows;

        return c.json({
            success: true as const,
            tags: tags,
        }, 200);
        
    } catch (e) {
        console.log('api/v1/templates/tags error while sending tags filtered by user');
        return c.json({
            success: false,
            errors: [{ message: 'Internal server error' }]
        }, 500)
    }
})

export default tagsRouter;