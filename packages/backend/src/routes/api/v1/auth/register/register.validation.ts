import z from "zod";
import { registerSchema } from "./register.schema.js";

export const registerValidation = z.object(registerSchema.shape).pick({
    email: true,
    password: true,
    timezone: true
})