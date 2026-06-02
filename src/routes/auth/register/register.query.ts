const REGISTER_USER_QUERY = `
    INSERT INTO users (username, email, passwordHash)
    value ($1, $2, $3)
    RETURNING id, username, email
`

export default REGISTER_USER_QUERY;