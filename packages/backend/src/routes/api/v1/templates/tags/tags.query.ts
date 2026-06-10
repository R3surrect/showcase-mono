import sql from "#/db.js";

interface Tag {
    id: number;
    color: string;
    label: string;
    emoji: string;
}

const findTagsByUserId = async (userId: number) => await sql<Tag[]>`
    SELECT id, label, color, emoji
    FROM tags
    WHERE owner_id = ${userId}
`

export default findTagsByUserId;