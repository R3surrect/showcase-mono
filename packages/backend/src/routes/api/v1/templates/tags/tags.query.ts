import sql from "#/db.js";
import type { RowList, Row } from "postgres";
import type { TagCreateInput } from "./tag.types.js";

export type FindTagsByUserId = (userId: number) => Promise<RowList<Row[]>>

export const findTagsByUserId: FindTagsByUserId = async (userId) => await sql`
    SELECT id, label, color, emoji, created_at, updated_at
    FROM tags
    WHERE owner_id = ${userId}
`

export type CreateTag = (data: TagCreateInput) => Promise<RowList<Row[]>>

export const createTag = async ({ label, color, ownerId, emoji }: TagCreateInput) => {
    const colorString = JSON.stringify(color);

    return await sql`
    INSERT INTO tags(label, emoji, color, owner_id)
    values
    (${label},${emoji},${colorString},${ownerId})
    RETURNING *
    `
}