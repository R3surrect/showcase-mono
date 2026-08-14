import type { AuthEnv } from "#/types/auth-env.js";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { taskCreateInputValidation } from "./validations/task.create.js";
import z from "zod";
import { createTask, deleteTask, findTasksByUserId } from "./scheduler.query.js";

export const schedulerRouter = new Hono<AuthEnv>()
    .get('/', async (c) => {
        const tasks = await findTasksByUserId(c.get('user').id);
        return c.json(tasks, 200);
    })
    .post(
        zValidator(
            'json',
            taskCreateInputValidation,
        ),
        async (c) => {
            const data = c.req.valid('json');

            const newTask = await createTask({ ...data, ownerId: c.get('user').id })
            return c.json(newTask, 201);
        }
    )
    .delete(
        '/:id',
        zValidator('param', z.object({ id: z.coerce.number().int().positive() })),
        async (c) => {
            const { id } = c.req.valid('param');
            if (isNaN(id)) return c.json({ message: 'Incorrect ID was provided' }, 400);

            const userId = c.get('user').id;
            const [row] = await deleteTask({ id: id, ownerId: userId });

            if (row) return c.json(row, 200);
            else return c.json({ message: 'Task not found' }, 404);
        }
    )