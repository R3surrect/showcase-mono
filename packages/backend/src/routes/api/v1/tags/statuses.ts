import { getStatusTags } from "#/shared/queries/tags.queries.js";
import type { AuthEnv } from "#/types/auth-env.js";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import z from "zod";
import { findTagById } from "../templates/tags/tags.query.js";

const STATUS_TYPES = ['project', 'task'] as const;
export type Statuses = typeof STATUS_TYPES[number];

const paramSchema = z.object({ type: z.enum(STATUS_TYPES) });
const idParamSchema = z.object({
    id: z.coerce.number().positive(),
});

export const statusesRouter = new Hono<AuthEnv>()
    .get(`/type/:type`, zValidator('param', paramSchema), async (c) => {
        const { type } = c.req.valid('param');

        const tags = await getStatusTags(c.get('user').id, type);
        return c.json(tags, 200);
    })
    .get('/:id', zValidator('param', idParamSchema), async (c) => {
        const { id } = c.req.valid('param');
        const [tag] = await findTagById({ id, ownerId: c.get('user').id });
        return c.json(tag, 200);
    });