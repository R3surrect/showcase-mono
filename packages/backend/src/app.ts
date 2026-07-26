import { serve } from "@hono/node-server";
import { Hono, type Env } from "hono";
import v1Router from "./routes/api/v1/index.js";
import corsMiddleware from "./middleware/cors.js";
import postgres from "postgres";
import { POSTRES_ERRORS } from "./shared/postgresql-errors.js";
import { config } from "./config.js";

const app = new Hono<Env>();

app.use('*', async (c, next) => {
    console.log(`[${c.req.method}] ${c.req.url}`)
    await next();
})

corsMiddleware(app);

app.route("/api/v1", v1Router);
app.onError((err, c) => {
    if (err instanceof postgres.PostgresError) {
        const pgErrorConfig = POSTRES_ERRORS[err.code];
        if (pgErrorConfig) {
            const pgErrorCode = pgErrorConfig.httpCode;
            if (pgErrorCode && Math.floor(pgErrorCode / 500) === 1) {
                console.error(`[CRITICAL ${pgErrorCode}]: ${c.req.method} ${c.req.path}:`, pgErrorConfig);
                return c.body(null, 500);
            }
            return c.json({ message: pgErrorConfig.message }, pgErrorConfig.httpCode)
        }
        console.error(`[CRITICAL 500][no info about ${err.code} at POSTGRES_ERRORS[err.code]]: ${c.req.method} ${c.req.path}`);
    }

    console.error(`[CRITICAL 500]: ${c.req.method} ${c.req.path}`);
    return c.body(null, 500);
});

serve({
    fetch: app.fetch,
    port: config.port
})