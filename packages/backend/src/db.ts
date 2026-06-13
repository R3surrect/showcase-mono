import postgres from 'postgres'
import { config } from './config.js';

const sql = postgres({
    host: 'localhost',
    port: 5432,
    database: config.db.DB_NAME,
    username: config.db.DB_USER,
    password: config.db.DB_PASSWORD,
    transform: postgres.toCamel
})

export default sql;

export const PG_ERRORS = {
    UNIQUE_VIOLATION: '23505',
    FOREIGN_KEY_VIOLATION: '23503',
    NOT_NULL_VIOLATION: '23502',
} as const;