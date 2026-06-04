import sql from "#/db.js";
import type { User } from "#/types/user.types.js";
import type { PendingQuery } from "postgres";

export type QueryParams =
    (
        email: string,
        passwordHash: string
    ) => PendingQuery<User[]>

const registerUserQuery: QueryParams = (email, passwordHash) => sql`
    INSERT INTO users (email, password_hash)
    VALUES (${email}, ${passwordHash})
    RETURNING id, email
`

export default registerUserQuery;