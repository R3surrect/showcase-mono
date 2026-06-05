import sql from "#/db.js";

const findTagsByUserId = (userId: number) => sql`
    SELECT id, label
    FROM tags
    WHERE owner_id = ${userId}
`

export default findTagsByUserId;