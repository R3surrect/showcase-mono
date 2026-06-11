import type z from "zod";
import type { tagCreateValidation } from "./tag.create.validation.js";

export type Tag = z.infer<typeof tagCreateValidation>;