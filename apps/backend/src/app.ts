import { serve } from "@hono/node-server";
import { Hono } from "hono";
import v1Router from "./routes/api/v1/index.js";

const app = new Hono();

app.use('*', async (c, next) => {
    console.log(`[${c.req.method}] ${c.req.url}`)
    await next();
})

app.route("/api/v1", v1Router);

const port = 8080;

serve({
    fetch: app.fetch,
    port
})