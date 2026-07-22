import { getDistinctCategories } from "#/shared/queries/tags.queries.js";
import type { AuthEnv } from "#/types/auth-env.js";
import { Hono } from "hono";

export const categoriesRouter = new Hono<AuthEnv>()
    .get('/categories', async (c) => {
        try {
            const categories = await getDistinctCategories(c.get('user').id);
            return c.json(categories, 200);
        } catch (e) {
            console.log(e);
            return c.json([{ message: 'Internal server error' }], 500)
        }
    })