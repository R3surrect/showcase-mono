import { Hono } from "hono";
import { createTag, findTagsByUserId } from "./tags.query.js";
import type { AuthEnv } from "#/types/auth-env.js";
import { zValidator } from "@hono/zod-validator";
import { tagCreateValidation } from "./validations/tag.create.validation.js";
import type { Row } from "postgres";
import { apiResponse } from "#/shared/api/response.js";
import { config } from "#/config.js";
import { zodToApiErrors } from "#/shared/api/zod-to-api-errors.js";

const tagsRouter = new Hono<AuthEnv>().get('/', async (c) => {
    try {
        const tags = await findTagsByUserId(c.get('user').id)
        return apiResponse.success(c, tags, 200);
    } catch (e) {
        !config.isProduction && console.error(`[CRITICAL 500]: ${c.req.method}] ${c.req.path}: ${e}`);
        return apiResponse.error(c, [{ message: 'Internal server error' }], 500)
    }
})
    .post('/', zValidator(
        'json',
        tagCreateValidation,
        (result, c) => {
            if (!result.success)
                return apiResponse.error(c, zodToApiErrors(result.error.issues), 400)
        }
    ),
        async (c) => {
            try {
                const data = await c.req.valid('json');
                const rows = await createTag(data);
                const newTag = rows[0];

                if (!newTag) {
                    !config.isProduction && console.error(`[CRITICAL 500]: ${c.req.method}] ${c.req.path}: Empty response array from DB while creating tag`);
                    return apiResponse.error(c, [{ message: 'Internal server error' }], 500)
                }
                return apiResponse.success(c, newTag, 201);
            } catch (e) {
                !config.isProduction && console.error(`[CRITICAL 500]: ${c.req.method} ${c.req.path}`, e);
                return apiResponse.error(c, [{ message: 'Internal server error' }], 500)
            }
        }
    )

export default tagsRouter;