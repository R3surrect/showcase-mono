import { serve } from "@hono/node-server";
import dotenv from 'dotenv'
import { Hono } from "hono";

const app = new Hono();

app.use('*', async (c, next) => {
    console.log(`[${c.req.method}] ${c.req.url}`)
    await next();
})

const port = 8080;

serve({
    fetch: app.fetch,
    port
})