import { config } from '#/config.js'
import type { Hono, Env } from 'hono'
import { cors } from 'hono/cors'

const corsMiddleware = <E extends Env>(app: Hono<E>) => {
    app.use(
        '/api/*',
        cors({
            origin: config.allowedOrigins,
            allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
            allowHeaders: ['Content-Type', 'Authorization', 'X-Requested-By'],
            credentials: true,
        })
    )
}

export default corsMiddleware