import sql from "../../../../db.js";
import type { NoteBaseOutput, NoteCreateOutput, NoteDbCreateInput, NoteDbUpdateInput, NoteUpdateOutput } from "./notes.types.js";


export type UpdateNote = (data: NoteDbUpdateInput) => Promise<NoteUpdateOutput>;

export type QueryNotesByUserId = (userId: number) => Promise<NoteBaseOutput[]>;
export const findNotesByUserId: QueryNotesByUserId = (userId) =>
    sql<NoteBaseOutput[]>`
        SELECT *
        FROM notes
        WHERE owner_id = ${userId};
    `;

export type QueryNotesByProjectId = (userId: number, projectId: number) => Promise<NoteBaseOutput[]>
export const findNotesByProjectId: QueryNotesByProjectId = (userId, projectId) =>
    sql<NoteBaseOutput[]>`
        SELECT *
        FROM notes
        WHERE notes.owner_id = ${userId} and projectId = ${projectId}
    `;

export type QueryNotesByTaskId = (userId: number, taskId: number) => Promise<NoteBaseOutput[]>
export const findNotesByTaskId: QueryNotesByTaskId = (userId, taskId) =>
    sql`
        SELECT *
        FROM notes
        WHERE owner_id = ${userId} and taskId = ${taskId}
    `;

export type InsertNoteMutation = (data: NoteDbCreateInput) => Promise<NoteCreateOutput>;
export const createNote: InsertNoteMutation = async ({ label, content, projectId, taskId, ownerId }) =>
    sql<NoteCreateOutput>`
        INSERT INTO notes(label, content, project_id, task_id, owner_id)
        values (${label}, ${content}, ${projectId}, ${taskId}, ${ownerId})
        RETURNING *
    `;