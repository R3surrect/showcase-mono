import { zValidator } from "@hono/zod-validator";
import bcrypt from "bcryptjs";
import { Hono } from "hono";
import loginValidation from "./login.validation.js";
import findUserByEmail from "./login.query.js";
import { sign } from "hono/jwt";
import { config } from "#/config.js";
import { setCookie } from "hono/cookie";

const loginRouter = new Hono().post(
    '/login',
    zValidator(
        'json',
        loginValidation,
        (result, c) => {
            if (!result.success) return c.json({
                success: false as const,
                errors: result.error.issues.map(issue => ({
                    field: issue.path.join('.'),
                    message: issue.message
                }))
            }, 400)
        }
    ),
    async (c) => {
        const { email, password } = c.req.valid('json');
        const rows = await findUserByEmail(email);

        const [user] = rows;

        if (!user)
            return c.json({
                success: false as const,
                errors: [{ message: 'Login or password is incorrect' }]
            }, 401)

        const hash = user['password_hash'];

        if (hash === undefined) {
            console.error('/api/v1/auth/login hashing error');

            return c.json({
                success: false as const,
                errors: [{ message: 'Internal server error' }]
            }, 500)
        }

        const isPasswordValid = await bcrypt.compare(password, hash);

        if (!isPasswordValid) return c.json({
            success: false as const,
            errors: [{ message: 'Login or password is incorrect' }]
        }, 401)

        const payload = {
            sub: user.id,
            email: user.email,
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
        }

        const token = await sign(payload, config.jwtSecret);

        setCookie(c, 'token', token, {
            httpOnly: true, 
            secure: config.nodeEnv,
            sameSite: 'Lax',
            maxAge: 60 * 60 * 24 * 7,
            path: '/',
        });

        console.log(token);

        return c.json({
            success: true as const,
            data: {
                user: {
                    id: user.id,
                    email: user.email
                }
            }
        }, 200)
    }
)

export default loginRouter