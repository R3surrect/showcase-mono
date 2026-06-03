import { z } from "zod";

const registerValidation = z.object({
    username: z
        .string()
        .min(1, 'Required field')
        .trim()
        .pipe(z.email({ message: 'Invalid email' })),
    password: z
        .string()
        .min(8, 'Password length must be at least 8 characters')
        .max(64, 'Password is too long')
        .regex(/[A-Z]/, 'Min 1 capital letter')
        .regex(/[a-z]/, 'Min 1 lower letter')
        .regex(/[0-9]/, 'Min 1 digit')
        .regex(/[^A-Za-z0-9]/, 'Special symbol required'),
});

export default registerValidation;
export type RegisterValidation = z.infer<typeof registerValidation>;