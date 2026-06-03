import postgres from 'postgres'
import { config } from './config.js';

const sql = postgres({
    host: 'localhost',
    port: 5432,
    database: config.db.DB_NAME,
    username: config.db.DB_USER,
    password: config.db.DB_PASSWORD,
})

export default sql;