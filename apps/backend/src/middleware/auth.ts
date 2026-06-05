import { config } from "#/config.js";
import type { MiddlewareHandler } from "hono";
import { getCookie } from "hono/cookie";
import { verify } from "hono/jwt";

export type AuthEnv = {
    Variables: {
        user: {
            id: string;
            email: string;
        }
    }
}

export const authMiddleware: MiddlewareHandler<AuthEnv> = async (c, next) => {
    try {
        const token = getCookie(c, "token");

        if (!token) return c.json({
            success: false as const,
            error: [{ message: 'Unauthorized: Invalid session!' }]
        })

        const user = await verify(token, config.jwtSecret, 'HS256');


    } catch (e) {
        console.error('Token counterfeit');
        c.json({
            success: false as const,
            error: [{ message: 'Unauthorized: Invalid session!' }]
        })
    }
}