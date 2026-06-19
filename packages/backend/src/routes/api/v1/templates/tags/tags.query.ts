import sql from "#/db.js";
import type { TagCreateInput, TagGetInput } from "./tag.types.js";

export type FindTagsByUserId = (userId: number) => Promise<TagGetInput[]>

export const findTagsByUserId: FindTagsByUserId = async (userId) => {
    const rows = await sql<TagGetInput[]>`
        SELECT id, label, color, emoji, created_at, updated_at
        FROM tags
        WHERE owner_id = ${userId}
    `
    return [...rows]

}
export type CreateTag = (data: TagCreateInput) => Promise<TagGetInput[]>

export const createTag: CreateTag = async ({ label, color, ownerId, emoji }) => {
    const colorString = JSON.stringify(color);

    const rows = await sql<TagGetInput[]>`
        INSERT INTO tags(label, emoji, color, owner_id)
        values
        (${label},${emoji},${colorString},${ownerId})
        RETURNING *
    `

    return [...rows];
}