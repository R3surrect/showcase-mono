import { Hono } from "hono";
import type { AuthEnv } from "#/types/auth-env.js";
import { zValidator } from "@hono/zod-validator";
import { config } from "#/config.js";
import { zodToApiErrors } from "#/shared/api/zod-to-api-errors.js";
import { tagCreateInputValidation } from "./validations/tag.create.js";
import { createTag, deleteTag, findTagsByUserId } from "./tags.query.js";

const tagsRouter = new Hono<AuthEnv>()
    .get('/', async (c) => {
        try {
            const tags = await findTagsByUserId(c.get('user').id)
            return c.json(tags, 200);
        } catch (e) {
            !config.isProduction && console.error(`[CRITICAL 500]: ${c.req.method}] ${c.req.path}: ${e}`);
            return c.json([{ message: 'Internal server error' }], 500)
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

                const newTag = (await createTag({
                    ...data,
                    ownerId: c.get('user').id
                }))[0];

                if (!newTag) {
                    !config.isProduction && console.error(
                        `[CRITICAL 500]: ${c.req.method}] ${c.req.path}: Empty response array from DB while creating tag`
                    );
                    return c.json([{ message: 'Internal server error' }], 500)
                }
                return c.json(newTag, 201);
            } catch (e) {
                !config.isProduction && console.error(`[CRITICAL 500]: ${c.req.method} ${c.req.path}`, e);
                return c.json([{ message: 'Internal server error' }], 500)
            }
        }
    )
    .delete(
        '/:id',
        async (c) => {
            try {
                const id = parseInt(c.req.param('id'));
                if (isNaN(id)) return c.json([{ message: 'Incorrect ID was provided' }], 400);

                const userId = c.get('user').id;

                const row = (await deleteTag({ id: id, ownerId: userId }))[0];
                if (row) return c.json(row, 200);
                else return c.json([{ message: 'Not found' }], 404);

            } catch (e) {
                !config.isProduction && console.error(`[CRITICAL 500]: ${c.req.method} ${c.req.path}`, e);
                return c.json([{ message: 'Internal server error' }], 500)
            }
        }
    )

export default tagsRouter;