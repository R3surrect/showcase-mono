import type { PendingQuery } from "postgres";
import sql from "../../../db.js";
import type postgres from "postgres";

type QueryParams =
    (
        username: string,
        email: string,
        passwordHash: string
    ) => PendingQuery<postgres.Row[]>

const REGISTER_USER_QUERY: QueryParams = (username, email, passwordHash) => sql`
    INSERT INTO users (username, email, password_hash)
    VALUES (${username}, ${email}, ${passwordHash})
    RETURNING id, username, email
`

export default REGISTER_USER_QUERY;