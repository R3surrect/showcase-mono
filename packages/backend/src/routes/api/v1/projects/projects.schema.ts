import { colorSchema, emojiSchema } from "#/shared/validations/customizable.validation.js";
import z from "zod";

// export const PRIORITIES = ['low', 'medium', 'high', 'fire'] as const;

// export const prioritySchema = z.enum(PRIORITIES);
// export type Priority = z.infer<typeof prioritySchema>;

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
    priorityTagId: z.number().int().positive(),

    ownerId: z.number().int().positive(),
    createdAt: z.date().or(z.iso.datetime()),
    updatedAt: z.date().or(z.iso.datetime()),
    isPinned: z.boolean(),
    isArchived: z.boolean(),
    pinnedAt: z.date().or(z.iso.datetime()).nullable(),
});

// type PriorityData = {
//     label: string;
//     color: ColorSchema;
// }

// export const PRIORITY_DATA: Record<Priority, PriorityData> = {
//     low: {
//         // id: 'low',
//         label: 'Low',
//         color: { h: 67, s: 26, l: 35 },
//     },
//     medium: {
//         // id: 'medium',
//         label: 'Medium',
//         color: { h: 64, s: 39, l: 53 },
//     },
//     high: {
//         // id: 'high',
//         label: 'High',
//         color: { h: 35, s: 39, l: 53 },
//     },
//     fire: {
//         // id: 'fire',
//         label: 'Fire',
//         color: { h: 11, s: 35, l: 47 },
//     },
// }