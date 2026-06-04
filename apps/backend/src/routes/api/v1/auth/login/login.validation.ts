import { z } from "zod";

const loginValidation = z.object({
    email: z
        .string()
        .min(7, 'Required field / too short email')
        .trim(),
    password: z
        .string()
        .min(8, 'Password is too short')
})

export default loginValidation;
export type LoginValidation = z.infer<typeof loginValidation>