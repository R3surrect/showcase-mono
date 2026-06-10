import { config } from "#/config.js";
import { Hono } from "hono";
import { getCookie } from "hono/cookie";
import { verify } from "hono/jwt";
import findUserById from "./me.query.js";

const meRouter = new Hono().get(
    '/me',
    async (c) => {
        const token = getCookie(c, 'token');

        if (!token) return c.json({
            success: false as const,
            errors: [{
                message: 'Unauthorized: No Token Provided'
            }]
        }, 401);

        let payload;

        try {
            payload = await verify(token, config.jwtSecret, 'HS256');
        } catch (e) {
            return c.json({
                success: false as const,
                errors: [{ message: 'Invalid or expired token' }]
            })
        }
        
        const userId = payload.sub;

        const [user] = await findUserById(Number(userId));

        if (!user || isNaN(Number(userId))) {
            console.warn(`User ${userId} not found in DB but had valid JWT`);

            return c.json({
                success: false as const,
                errors: [{ message: 'Unauthorized: Session is invalid' }]
            }, 401)
        }

        return c.json({
            success: true as const,
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