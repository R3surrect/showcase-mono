import type { PendingQuery } from "postgres";
import sql from "#/db.js";

export interface User {
    id: number;
    username: string;
    email: string;
}

type QueryParams =
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