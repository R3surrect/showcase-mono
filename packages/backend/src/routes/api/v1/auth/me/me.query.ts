import sql from "#/db.js";

const findUserById = (id: number) => sql`
    SELECT id, email
    FROM users
    WHERE id = ${id}
`

export default findUserById;