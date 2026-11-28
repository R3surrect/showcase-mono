import { Hono } from "hono";
import type { AuthEnv } from "../../../../types/auth-env.js";
import { createNote, deleteNote, findNotesByUserId, updateNote } from "./notes.query.js";
import { zValidator } from "@hono/zod-validator";
import { noteCreateInputValidation } from "./validations/note.create.js";
import z from "zod";
import { noteUpdateValidation } from "./validations/note.update.js";

export const notesRouter = new Hono<AuthEnv>()
    .get('/',
        async (c) => {
            const notes = await findNotesByUserId(c.get('user').id);
            return c.json(notes, 200);
        })
    .post('/',
        zValidator(
            'json',
            noteCreateInputValidation,
        ),
        async (c) => {
            const data = c.req.valid('json');

            const newNote = await createNote({ ...data, ownerId: c.get('user').id });
            return c.json(newNote, 201);
        })
    .delete(
        '/:id',
        zValidator('param', z.object({ id: z.coerce.number().int().positive() })),
        async (c) => {
            const { id } = c.req.valid('param');
            if (isNaN(id)) return c.json({ message: 'Incorrect ID was provided' }, 400);

            const userId = c.get('user').id;
            const [row] = await deleteNote({ id: id, ownerId: userId });

            if (row) return c.json(row, 200);
            else return c.json({ message: 'Task not found' }, 404);
        }
    )
    .patch(
        '/:id',
        zValidator('json', noteUpdateValidation),
        async (c) => {
            const taskId = Number(c.req.param('id'));
            const data = c.req.valid('json');
            const userId = c.get('user').id;

            if (Object.values(data).length === 0)
                return c.json([{ message: 'No fields provided' }], 400);

            const updatedTask = await updateNote({ id: taskId, ownerId: userId, ...data });
            return c.json(updatedTask, 201);
        }
    )