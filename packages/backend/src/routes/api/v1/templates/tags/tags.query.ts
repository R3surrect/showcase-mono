import sql from "#/db.js";
import type { TagDbCreateInput, TagCreateOutput, TagGetOutput, TagDbDeleteInput } from "./tag.types.js";

export type QueryTagsByUserId = (userId: number) => Promise<TagGetOutput[]>;
export const findTagsByUserId: QueryTagsByUserId = async (userId) => {
    const rows = await sql<TagCreateOutput[]>`
        SELECT id, label, color, type, category, created_at, updated_at
        FROM tags
        WHERE owner_id = ${userId}
    `

    return rows;
}

export type InsertTagMutation = (data: TagDbCreateInput) => Promise<TagCreateOutput[]>;
export const createTag: InsertTagMutation = async ({ label, color, type, category, ownerId }) => {
    const rows = await sql<TagCreateOutput[]>`
        INSERT INTO tags(label, color, type, category, owner_id)
        values (${label},${sql.json(color)},${type},${category},${ownerId})
        RETURNING *
    `

    return [...rows];
}

export type QueryTagByOwner = (data: TagDbDeleteInput) => Promise<TagCreateOutput[]>;
export const findTagById: QueryTagByOwner = async ({ id, ownerId }) => {
    const rows = await sql<TagGetOutput[]>`
        SELECT * from TAGS
        WHERE id = ${id} and owner_id = ${ownerId}
    `;

    return [...rows];
}

export const deleteTag: QueryTagByOwner = async ({ id, ownerId }) => {
    const rows = await sql<TagCreateOutput[]>` 
        DELETE FROM tags
        WHERE id = ${id} and owner_id=${ownerId} and category != 'System'
        RETURNING *;
    `;

    return [...rows];
}