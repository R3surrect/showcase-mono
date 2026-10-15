import fs from 'node:fs'
import { Client } from 'pg';

const client = Client();

try {
    await client.connect();

    const initSql = fs.readFileSync('./init.sql', 'utf8');
    const indexSql = fs.readFileSync('./indexes.sql', 'utf8');
    const onRegSql = fs.readFileSync('./on_reg.sql', 'utf8');

    await client.query(initSql);
    await client.query(indexSql);
    await client.query(onRegSql);

    console.log('db initialized');
} catch (e) {
    console.error(`PG ERROR`, e);
    process.exit(1);
} finally {
    await client.end();
}