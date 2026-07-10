import { colorSchema, emojiSchema } from "#/shared/validations/customizable.validation.js";
import z from "zod";

export const prioritySchema = z.enum(['low', 'medium', 'high', 'fire']);

export const projectSchema = z.object({
    id: z.number().int().positive(),
    label: z
        .string()
        .min(1, 'Required field')
        .max(50, 'Project label is too large')
        .trim(),

    details: z.string().nullable(),

    color: colorSchema,
    emoji: emojiSchema,
    priority: prioritySchema,

    ownerId: z.number().int().positive(),
    createdAt: z.date().or(z.iso.datetime()),
    updatedAt: z.date().or(z.iso.datetime()),
    isPinned: z.boolean(),
    isArchived: z.boolean(),
    pinnedAt: z.date().or(z.iso.datetime()).nullable(),
});