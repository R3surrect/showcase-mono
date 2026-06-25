import { colorSchema } from "#/shared/validations/customizable.validation.js";
import { z } from "zod";

export const tagSchema = z.object({
    id: z.number().int().positive(),

    label: z
        .string()
        .min(1, 'Required field')
        .max(64, 'Tag label is too large')
        .trim(),

    color: colorSchema,

    ownerId: z.number().int().positive(),
    createdAt: z.date().or(z.iso.datetime()),
    updatedAt: z.date().or(z.iso.datetime()),
})