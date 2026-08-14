import { AuthEnv } from "#/types/auth-env.js";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

const schedulerRouter = new Hono<AuthEnv>()
    .post(
        zValidator(
            'json',
            schedulerValidation,
        ),
        async (c) => {
            const data = c.req.valid('json');

            
        }
    )