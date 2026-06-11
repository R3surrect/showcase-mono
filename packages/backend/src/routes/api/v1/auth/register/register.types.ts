import type z from "zod";
import type registerValidation from "./register.validation.js";

export type RegisterValidation = z.infer<typeof registerValidation>;