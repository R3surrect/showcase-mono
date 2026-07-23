import { Hono } from "hono";
import type { AuthEnv } from "#/types/auth-env.js";
import { zValidator } from "@hono/zod-validator";
import { config } from "#/config.js";
import { zodToApiErrors } from "#/shared/api/zod-to-api-errors.js";
import { tagCreateInputValidation } from "./validations/tag.create.js";
import { createTag, deleteTag, findTagsByUserId } from "./tags.query.js";
import { TAG_TYPES } from "./tag.schema.js";
import z from "zod";

const tagsRouter = new Hono<AuthEnv>()
    .get('/', async (c) => {
        try {
            const tags = await findTagsByUserId(c.get('user').id)
            return c.json(tags, 200);
        } catch (e) {
            console.error(`[CRITICAL 500]: ${c.req.method}] ${c.req.path}: ${e}`);
            return c.body(null, 500)
        }
    })
    .post('/', zValidator(
        'json',
        tagCreateInputValidation,
        (result, c) => {
            if (!result.success)
                return c.json(zodToApiErrors(result.error.issues), 400);
        }
    ),
        async (c) => {
            try {
                const data = await c.req.valid('json');

                if (!TAG_TYPES.includes(data.type)) return c.json({ message: 'Bad request provided creating tag' }, 400);

                const newTagRaw = await createTag({ ...data, ownerId: c.get('user').id });
                const newTag = newTagRaw[0];

                if (!newTag) {
                    !config.isProduction && console.error(`[CRITICAL 500]: ${c.req.method}] ${c.req.path}: Empty response array from DB while creating tag`);
                    return c.body(null, 500);
                }
                return c.json(newTag, 201);
            } catch (e) {
                !config.isProduction && console.error(`[CRITICAL 500]: ${c.req.method} ${c.req.path}`, e);
                return c.body(null, 500)
            }
        }
    )
    .delete(
        '/:id',
        zValidator('param', z.object({ id: z.coerce.number().int().positive() })),
        async (c) => {
            try {
                const { id } = c.req.valid('param');
                if (isNaN(id)) return c.json({ message: 'Incorrect ID was provided' }, 400);

                const userId = c.get('user').id;
                const [row] = await deleteTag({ id: id, ownerId: userId });

                if (row) return c.json(row, 200);
                else return c.json({ message: 'Tag not found' }, 404);

            } catch (e) {
                !config.isProduction && console.error(`[CRITICAL 500]: ${c.req.method} ${c.req.path}`, e);
                return c.body(null, 500)
            }
        }
    )

export default tagsRouter;