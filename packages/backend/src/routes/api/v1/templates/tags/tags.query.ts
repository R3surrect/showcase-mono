import sql from "#/db.js";
import type { TagDbCreateInput, TagCreateOutput, TagGetOutput } from "./tag.types.js";

export type FindTagsByUserId = (userId: number) => Promise<TagGetOutput[]>

export const findTagsByUserId: FindTagsByUserId = async (userId) => {
    const rows = await sql<TagCreateOutput[]>`
        SELECT id, label, color, type, category, created_at, updated_at
        FROM tags
        WHERE owner_id = ${userId}
    `

    return [...rows]
}

export type CreateTag = (data: TagDbCreateInput) => Promise<TagCreateOutput[]>

export const createTag: CreateTag = async ({ label, color, type, category, ownerId }) => {
    const colorString = JSON.stringify(color);
    const rows = await sql<TagCreateOutput[]>`
        INSERT INTO tags(label, color, type, category, owner_id)
        values
        (${label},${colorString},${type},${category},${ownerId})
        RETURNING *
    `

    return [...rows];
}