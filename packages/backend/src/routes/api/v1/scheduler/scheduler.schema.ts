import { z } from "zod";

export const taskSchema = z.object({
    id: z.number().int().positive(),
    title: z
        .string()
        .min(1, 'Required field')
        .max(64, 'Task label is too large')
        .trim(),

    details: z.string().nullable(),
    deadline: z.date().or(z.iso.datetime()),
    projectId: z.number().int().positive(),
    priorityTagId: z.number().int().positive(),
    statusTagId: z.number().int().positive(),

    ownerId: z.number().int().positive(),
    createdAt: z.date().or(z.iso.datetime()),
    updatedAt: z.date().or(z.iso.datetime()),
    isPinned: z.boolean(),
    isArchived: z.boolean(),
    pinnedAt: z.date().or(z.iso.datetime()).nullable(),
})