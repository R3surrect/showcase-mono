import { getPriorityTags } from "#/shared/queries/tags.queries.js";
import type { AuthEnv } from "#/types/auth-env.js";
import { Hono } from "hono";

export const prioritiesRouter = new Hono<AuthEnv>()
    .get('/', async (c) => {
        try {
            const priorities = await getPriorityTags(c.get('user').id);
            return c.json(priorities, 200);
        } catch (e) {
            console.log(e);
            return c.body(null, 500)
        }
    })