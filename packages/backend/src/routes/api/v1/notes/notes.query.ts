import sql from "../../../../db.js";
import type { NoteBaseOutput, NoteCreateOutput, NoteDbCreateInput, NoteDbDeleteInput, NoteDbUpdateInput, NoteUpdateOutput } from "./notes.types.js";

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

export type InsertNoteMutation = (data: NoteDbCreateInput) => Promise<NoteCreateOutput[]>;
export const createNote: InsertNoteMutation = ({ label, content, projectId, taskId, ownerId }) =>
    sql<NoteCreateOutput[]>`
        INSERT INTO notes(label, content, project_id, task_id, owner_id)
        values (${label}, ${sql.json(content)}, ${projectId}, ${taskId}, ${ownerId})
        RETURNING *
    `;

export type DeleteNoteMutation = (data: NoteDbDeleteInput) => Promise<NoteBaseOutput[]>;
export const deleteNote: DeleteNoteMutation = ({ id, ownerId }) =>
    sql<NoteBaseOutput[]>` 
        DELETE FROM notes
        WHERE id = ${id} and owner_id=${ownerId}
        RETURNING *;
    `;

export type UpdateNote = (data: NoteDbUpdateInput) => Promise<NoteUpdateOutput | null>;
export const updateNote: UpdateNote = async ({ id, ownerId, ...data }) => {
    const rawPayload = {
        ...data,
        ...(data.isPinned !== undefined && {
            pinnedAt: data.isPinned ? new Date() : null
        })
    };

    const dbPayload = Object.fromEntries(Object.entries(rawPayload).filter((_, value) => value !== undefined));
    if (Object.keys(dbPayload).length === 0) return null;

    const [rows] = await sql<NoteUpdateOutput[]>`
        UPDATE notes
        SET ${sql(dbPayload)}
        WHERE id = ${id} AND owner_id = ${ownerId}
        RETURNING *
    `;

    return rows ?? null;
}