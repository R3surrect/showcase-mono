import { Hono } from "hono";
import type { AuthEnv } from "#/types/auth-env.js";
import { zValidator } from "@hono/zod-validator";
// import { config } from "#/config.js";
// import { zodToApiErrors } from "#/shared/api/zod-to-api-errors.js";
import { projectCreateDbInputValidation } from "./validations/project.create.js";
import { createProject, findProjectsByUserId, updateProject } from "./projects.query.js";
import { projectUpdateValidation } from "./validations/project.update.js";

export const projectsRouter = new Hono<AuthEnv>()
    .get('/', async (c) => {
        try {
            const projects = await findProjectsByUserId(c.get('user').id);
            return c.json(projects, 200);
        } catch (e) {
            console.error(`[CRITICAL 500]: ${c.req.method}] ${c.req.path}: ${e}`);
            return c.json([{ message: 'Internal server error' }], 500)
        }
    })
    .patch('/:id',
        zValidator('json', projectUpdateValidation),
        async (c) => {
            try {
                const projectId = Number(c.req.param('id'));
                const data = c.req.valid('json');
                const userId = c.get('user').id;

                if (Object.values(data).length === 0) {
                    return c.json([{ message: 'No fields provided' }], 400);
                }

                const updatedProject = (await updateProject({ id: projectId, ownerId: userId, ...data }))[0];
                return c.json(updatedProject, 201);

            } catch (e) {
                console.error(`[CRITICAL 500]: ${c.req.method}] ${c.req.path}: ${e}`);
                return c.json([{ message: 'Internal server error' }], 500);
            }
        }
    )
    .post('/', zValidator(
        'json',
        projectCreateDbInputValidation,
        // (result, c) => {
        //     if (!result.success) return c.json(zodToApiErrors(result.error.issues), 400);
        // }
    ),
        async (c) => {
            try {
                const data = await c.req.valid('json');

                const newProject = (await createProject({
                    ...data,
                    ownerId: c.get('user').id
                }))[0];

                if (!newProject) {
                    console.error(
                        `[CRITICAL 500]: ${c.req.method}] ${c.req.path}: Empty response array from DB while creating project`
                    );
                    return c.json([{ message: 'Internal server error' }], 500)
                }
                return c.json(newProject, 201);
            } catch (e) {
                console.error(`[CRITICAL 500]: ${c.req.method} ${c.req.path}`, e);
                return c.json([{ message: 'Internal server error' }], 500)
            }
        }
    )

export default projectsRouter