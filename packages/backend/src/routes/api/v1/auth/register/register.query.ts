import sql from "#/db.js";
import type { User } from "#/types/user.js";
import type { PendingQuery } from "postgres";

export type QueryParams = (email: string, passwordHash: string, timezone: string) => PendingQuery<User[]>

const registerUserQuery: QueryParams = (email, passwordHash, timezone) => sql`
    INSERT INTO users (email, password_hash, timezone)
    VALUES (${email}, ${passwordHash}, ${timezone})
    RETURNING id, email
`

export default registerUserQuery;