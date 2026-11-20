import { Hono } from "hono";
import type { AuthEnv } from "../../../../types/auth-env.js";
import { findNotesByUserId } from "./notes.query.js";

export const notesRoutes = new Hono<AuthEnv>()
    .get('/',
        async (c) => {
            const notes = await findNotesByUserId(c.get('user').id);
            return c.json(notes, 200);
        }
    )