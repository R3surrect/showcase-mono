import { getPriorityTags } from "#/shared/queries/tags.queries.js";
import type { AuthEnv } from "#/types/auth-env.js";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import z from "zod";
import { findTagById } from "../templates/tags/tags.query.js";

const idParamSchema = z.object({
    id: z.coerce.number().positive(),
});

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