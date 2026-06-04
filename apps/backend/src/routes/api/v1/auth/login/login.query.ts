import sql from "#/db.js";

const findUserByEmail = (email: string) => sql`
    SELECT id, email, password_hash FROM users where email = ${email}
`

export default findUserByEmail;