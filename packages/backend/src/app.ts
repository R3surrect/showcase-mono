import { serve } from "@hono/node-server";
import { Hono, type Env } from "hono";
import v1Router from "./routes/api/v1/index.js";
import corsMiddleware from "./middleware/cors.js";

const app = new Hono<Env>();

app.use('*', async (c, next) => {
    console.log(`[${c.req.method}] ${c.req.url}`)
    await next();
})

corsMiddleware(app);

app.route("/api/v1", v1Router);

app.onError((err, c) => {
    console.error(`[CRITICAL 500]: ${c.req.method} ${c.req.path}:`, err);
    return c.body(null, 500);
});

const port = 8080;

serve({
    fetch: app.fetch,
    port
})