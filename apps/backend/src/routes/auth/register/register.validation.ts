import { z } from "zod";

const registerValidation = z.object({
    username: z.string().min(2, 'Username must be at least 2 characters long'),
    password: z.string().min(8, 'Password must be at least 8 characters long')
})