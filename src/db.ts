import postgres from 'postgres'

const sql = postgres({
    host: 'localhost',
    port: 5432,
    database: 'iplanify',
    username: 'dev_useripy',
    password: 'dev_passwordipy',
})

export default sql;