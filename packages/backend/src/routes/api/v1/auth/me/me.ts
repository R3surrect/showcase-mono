import { config } from "#/config.js";
import { Hono } from "hono";
import { getCookie } from "hono/cookie";
import { verify } from "hono/jwt";
import findUserById from "./me.query.js";
import type { AuthEnv } from "#/types/auth-env.js";

const meRouter = new Hono<AuthEnv>().get(
    '/me',
    async (c) => {
        const token = getCookie(c, 'token');

        if (!token) return c.json({
            errors: [{
                message: 'Unauthorized: No Token Provided'
            }]
        }, 401);

        let payload;

        try {
            payload = await verify(token, config.jwtSecret, 'HS256');
        } catch (e) {
            return c.json({
                errors: [{ message: 'Invalid or expired token' }]
            })
        }
        
        const userId = payload.sub;

        const [user] = await findUserById(Number(userId));

        if (!user || isNaN(Number(userId))) {
            console.warn(`User ${userId} not found in DB but had valid JWT`);

            return c.json({
                errors: [{ message: 'Unauthorized: Session is invalid' }]
            }, 401)
        }

        return c.json({
            data: {
                user: {
                    id: user.id,
                    email: user.email
                }
            }
        });
    }
)

export default meRouter;