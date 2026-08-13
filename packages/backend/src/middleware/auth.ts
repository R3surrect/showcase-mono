import { config } from "#/config.js";
import type { AuthEnv } from "#/types/auth-env.js";
import { getCookie } from "hono/cookie";
import { verify } from "hono/jwt";
import { createMiddleware } from "hono/factory";

export const authMiddleware = createMiddleware<AuthEnv>(async (c, next) => {
    try {
        const token = getCookie(c, "token");
        if (!token) return c.json({ message: 'Unauthorized: Invalid session!' }, 401)

        const payload = await verify(token, config.jwtSecret, 'HS256');
        if (!payload.sub || !payload.email) return c.json({ message: 'Unauthorized: Invalid session!' }, 401)

        c.set('user', {
            id: Number(payload.sub),
            email: String(payload.email)
        })

        await next();

    } catch (e) {
        console.error('Token counterfeit');
        return c.json({ message: 'Unauthorized: Invalid session!' }, 401)
    }
})