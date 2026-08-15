import { Hono } from "hono";
import { zValidator } from '@hono/zod-validator'
import registerUserQuery from "./register.query.js";
import bcrypt from 'bcryptjs';
import postgres from "postgres";
import { PG_ERRORS } from "#/db.js";
// import { zodToApiErrors } from "#/shared/api/zod-to-api-errors.js";
import { registerValidation } from "./register.validation.js";
import { config } from "#/config.js";
import { setCookie } from "hono/cookie";
import { sign } from "hono/jwt";

const registerRouter = new Hono().post(
    '/register',
    zValidator(
        'json',
        registerValidation,
        // (result, c) => {
        //     if (!result.success) return c.json({
        //         errors: zodToApiErrors(result.error.issues)
        //     }, 400)
        // }
    ),
    async (c) => {
        const { email, password, timezone } = c.req.valid('json');
        const hash = await bcrypt.hash(password, 12);

        try {
            const [registerResult] = await registerUserQuery(email, hash, timezone);
            if (registerResult) {

                const payload = {
                    sub: registerResult.id,
                    email: registerResult.email,
                    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
                };

                const token = await sign(payload, config.jwtSecret);

                setCookie(c, 'token', token, {
                    httpOnly: true,
                    secure: config.isProduction,
                    sameSite: 'Lax',
                    maxAge: 60 * 60 * 24 * 7,
                    path: '/',
                });

                return c.json({ user: registerResult }, 201)
            }
        } catch (e: unknown) {
            if (e instanceof postgres.PostgresError) {
                if (e.code === PG_ERRORS['UNIQUE_VIOLATION'])
                    return c.json({
                        errors: [{ field: 'email', message: 'This email is already in use' }]
                    }, 400)
            }
            return c.json({
                errors: [{ field: null, message: e }]
            }, 500)
        }
    }
)

export default registerRouter;