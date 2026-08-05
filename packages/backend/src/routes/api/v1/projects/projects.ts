import { Hono } from "hono";
import type { AuthEnv } from "#/types/auth-env.js";
import { zValidator } from "@hono/zod-validator";
import { projectCreateInputValidation } from "./validations/project.create.js";
import { createProject, findProjectsByUserId, updateProject } from "./projects.query.js";
import { projectUpdateValidation } from "./validations/project.update.js";

export const projectsRouter = new Hono<AuthEnv>()
    .get('/', async (c) => {
        const projects = await findProjectsByUserId(c.get('user').id);
        return c.json(projects, 200);
    })
    .post('/', zValidator(
        'json',
        projectCreateInputValidation,
    ),
        async (c) => {
            const data = await c.req.valid('json');
            const newProject = await createProject({
                ...data,
                ownerId: c.get('user').id
            });

            if (!newProject) {
                console.error(
                    `[CRITICAL 500]: ${c.req.method}] ${c.req.path}: Empty response array from DB while creating project`
                );
                return c.body(null, 500)
            }
            return c.json(newProject, 201);
        }
    )
    .patch('/:id',
        zValidator('json', projectUpdateValidation),
        async (c) => {
            const projectId = Number(c.req.param('id'));
            const data = c.req.valid('json');
            const userId = c.get('user').id;

            if (Object.values(data).length === 0) return c.json([{ message: 'No fields provided' }], 400);

            const updatedProject = await updateProject({ id: projectId, ownerId: userId, ...data });
            return c.json(updatedProject, 201);
        }
    )

export default projectsRouter