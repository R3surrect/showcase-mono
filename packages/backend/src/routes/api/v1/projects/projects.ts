import { config } from "#/config.js";
import type { AuthEnv } from "#/types/auth-env.js";
import { Hono } from "hono";
import { createProject, findProjectsByUserId } from "./projects.query.js";
import { zValidator } from "@hono/zod-validator";
import { projectCreateDbInputValidation } from "./validations/project.create.js";
import { zodToApiErrors } from "#/shared/api/zod-to-api-errors.js";

export const projectsRouter = new Hono<AuthEnv>()
    .get('/', async (c) => {
        try {
            const projects = await findProjectsByUserId(c.get('user').id);
            return c.json(projects, 200)
        } catch (e) {
            !config.isProduction && console.error(`[CRITICAL 500]: ${c.req.method}] ${c.req.path}: ${e}`);
            return c.json([{ message: 'Internal server error' }], 500)
        }
    })
    .post('/', zValidator(
        'json',
        projectCreateDbInputValidation,
        (result, c) => {
            if (!result.success)
                return c.json(zodToApiErrors(result.error.issues), 400);
        }
    ),
        async (c) => {
            try {
                const data = await c.req.valid('json');

                const newProject = (await createProject({
                    ...data,
                    ownerId: c.get('user').id
                }))[0];

                if (!newProject) {
                    !config.isProduction && console.error(
                        `[CRITICAL 500]: ${c.req.method}] ${c.req.path}: Empty response array from DB while creating project`
                    );
                    return c.json([{ message: 'Internal server error' }], 500)
                }
                return c.json(newProject, 201);
            } catch (e) {
                !config.isProduction && console.error(`[CRITICAL 500]: ${c.req.method} ${c.req.path}`, e);
                return c.json([{ message: 'Internal server error' }], 500)
            }
        }
    )

export default projectsRouter