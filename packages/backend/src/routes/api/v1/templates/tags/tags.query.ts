import sql from "#/db.js";
import type { Tag } from "./tag.types.js";

type FindTagsByUserId = Omit<Tag, 'owner_id'>

const findTagsByUserId = async (userId: number) => await sql<FindTagsByUserId[]>`
    SELECT id, label, color, emoji, created_at, updated_at
    FROM tags
    WHERE owner_id = ${userId}
`

export default findTagsByUserId;