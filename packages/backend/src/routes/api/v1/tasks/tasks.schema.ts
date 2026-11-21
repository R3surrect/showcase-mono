import { z } from "zod";

export const taskSchema = z.object({
    id: z.number().int().positive(),
    label: z.string().trim().min(1, 'Required field').max(32, 'Task label is too large'),
    details: z.string().nullable(),
    deadline: z.iso.datetime({ local: true }).nullable(),
    projectId: z.union([
        z.number().int().nonnegative(),
        z.string(),
        z.undefined(),
        z.null(),
        z.nan()
    ]).transform(val => (val ? Number(val) : null)),

    priorityTagId: z.number().int().positive(),
    statusTagId: z.number().int().positive(),
    notifyAt: z.date().or(z.iso.datetime({ local: true })).nullable(),

    ownerId: z.number().int().positive(),
    createdAt: z.date().or(z.iso.datetime()),
    updatedAt: z.date().or(z.iso.datetime()),
    isPinned: z.boolean(),
    isArchived: z.boolean(),
    pinnedAt: z.date().or(z.iso.datetime()).nullable(),
})