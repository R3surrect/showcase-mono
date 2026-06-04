import { Hono } from "hono";
import { zValidator } from '@hono/zod-validator'
import registerUserQuery from "./register.query.js";
import bcrypt from 'bcryptjs';
import registerValidation from "./register.validation.js";
import postgres from "postgres";
import { PG_ERRORS } from "#/db.js";

const registerRouter = new Hono();

registerRouter.post(
    '/register',
    zValidator(
        'json',
        registerValidation,
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
        const hash = await bcrypt.hash(password, 12);

        try {
            const registerResult = await registerUserQuery(email, hash);
            return c.json({
                success: true as const,
                user: registerResult
            }, 201)
        } catch (e: unknown) {
            if (e instanceof postgres.PostgresError) {
                if (e.code === PG_ERRORS['UNIQUE_VIOLATION'])
                    return c.json({
                        success: false as const,
                        errors: [{ field: 'email', message: 'This email is already in use' }]
                    }, 400)
            }
            return c.json({
                success: false as const,
                errors: [{ field: null, message: e }]
            }, 500)
        }
    }
)

export default registerRouter;