import sql from "#/db.js";
import type { TagDbCreateInput, TagCreateInput, TagCreateOutput } from "./tag.types.js";

export type FindTagsByUserId = (userId: number) => Promise<TagCreateOutput[]>

export const findTagsByUserId: FindTagsByUserId = async (userId) => {
    const rows = await sql<TagCreateOutput[]>`
        SELECT id, label, color, created_at, updated_at
        FROM tags
        WHERE owner_id = ${userId}
    `
    
    return [...rows]
}

export type CreateTag = (data: TagDbCreateInput) => Promise<TagCreateOutput[]>

export const createTag: CreateTag = async ({ label, color, ownerId }) => {
    const colorString = JSON.stringify(color);
    const rows = await sql<TagCreateOutput[]>`
        INSERT INTO tags(label, color, owner_id)
        values
        (${label},${colorString},${ownerId})
        RETURNING *
    `

    return [...rows];
}