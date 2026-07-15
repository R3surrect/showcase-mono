import { colorSchema } from "#/shared/validations/customizable.validation.js";
import { z } from "zod";

export const tagTypes = ['project_status', 'task_status', 'priority', 'tag_type', 'tag_category', 'custom'] as const;
export const tagTypeSchema = z.enum(tagTypes, { error: 'Type mismatch' });

export const tagSchema = z.object({
    id: z.number().int().positive(),

    label: z
        .string()
        .min(1, 'Required field')
        .max(64, 'Tag label is too large')
        .trim(),

    color: colorSchema,
    type: tagTypeSchema,

    category: z
        .string()
        .min(1, 'Required field')
        .max(32, 'Tag category is too large')
        .trim(),

    ownerId: z.number().int().positive(),
    createdAt: z.date().or(z.iso.datetime()),
    updatedAt: z.date().or(z.iso.datetime()),
})