import { z } from "zod";

export const noteSchema = z.object({
    id: z.number().int().positive(),
    label: z.string().trim().min(1, 'Required field').max(32, 'Note label is too large'),
    content: z.object({
        type: z.literal('doc'),
        content: z.array(z.json()).optional(),
    }),

    ownerId: z.number().int().positive(),
    projectId: z.number().int().positive(),
    taskId: z.number().int().positive(),

    createdAt: z.date().or(z.iso.datetime()),
    updatedAt: z.date().or(z.iso.datetime()),
    isPinned: z.boolean(),
    pinnedAt: z.date().or(z.iso.datetime()).nullable(),
    isArchived: z.boolean(),
})