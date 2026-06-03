import { Hono } from "hono";
import { zValidator } from '@hono/zod-validator'
import REGISTER_USER_QUERY from "./register.query.js";
import bcrypt from 'bcryptjs';
import registerValidation from "./register.validation.js";

const registerRouter = new Hono();

interface RegisterData {
    email: string;
    password: string;
}

registerRouter.post('/register', zValidator('json', registerValidation, async (result, c) => {
    if (!result.success) return c.json({
        success: false,
        errors: result.error.issues.map(issue => ({
            field: issue.path.join('.'),
            message: issue.message
        }))
    }, 400)
}),
    async (c) => {
        const { email, password } = await c.req.json<RegisterData>();
        const hash = bcrypt.hash(password, 12);

        
    }
)