import sql from "#/db.js";
import type { RowList } from "postgres";
import type { Tag, TagCreateInput, TagGetClientPayload } from "./tag.types.js";

export type FindTagsByUserId = (userId: number) => Promise<TagGetClientPayload[]>

export const findTagsByUserId: FindTagsByUserId = async (userId) => {
    const rows = await sql<TagGetClientPayload[]>`
        SELECT id, label, color, emoji, created_at, updated_at
        FROM tags
        WHERE owner_id = ${userId}
    `
    return [...rows]

}
export type CreateTag = (data: TagCreateInput) => Promise<RowList<TagGetClientPayload[]>>

export const createTag = async ({ label, color, ownerId, emoji }: TagCreateInput) => {
    const colorString = JSON.stringify(color);

    return await sql<Tag[]>`
    INSERT INTO tags(label, emoji, color, owner_id)
    values
    (${label},${emoji},${colorString},${ownerId})
    RETURNING *
    `
}