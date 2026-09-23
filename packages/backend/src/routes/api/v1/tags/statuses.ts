import { Hono } from "hono";
import z from "zod";
import { getStatusTags } from "#/shared/queries/tags.queries.js";
import type { AuthEnv } from "#/types/auth-env.js";
import { zValidator } from "@hono/zod-validator";

const STATUS_TYPES = ['project', 'task'] as const;
export type Statuses = typeof STATUS_TYPES[number];

const paramSchema = z.object({ type: z.enum(STATUS_TYPES) });

export const statusesRouter = new Hono<AuthEnv>()
    .get(`/type/:type`, zValidator('param', paramSchema), async (c) => {
        const { type } = c.req.valid('param');

        const tags = await getStatusTags(c.get('user').id, type);
        return c.json(tags, 200);
    })