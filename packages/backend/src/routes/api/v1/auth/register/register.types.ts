import type z from "zod";
import type { registerSchema } from "./register.schema.js";

export type RegisterValidation = z.infer<typeof registerSchema>;