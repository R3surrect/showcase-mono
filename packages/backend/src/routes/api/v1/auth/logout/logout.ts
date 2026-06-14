import { config } from "#/config.js";
import { Hono } from "hono";
import { deleteCookie } from "hono/cookie";

const logoutRouter = new Hono().post('/logout', async (c) => {
    try {
        deleteCookie(c, 'token', {
            path: '/',
            secure: config.isProduction,
            sameSite: 'Lax'
        });

        return c.body(null, 204);
    } catch (e) {
        if (config.isProduction) console.error('logout fail', e);
        return c.status(500);
    }
});

export default logoutRouter;