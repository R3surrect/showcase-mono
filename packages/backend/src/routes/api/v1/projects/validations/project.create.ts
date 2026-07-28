import z from "zod";
import { projectSchema } from "../projects.schema.js";

//* The database requires an additional ownerId field
export const projectCreateDbInputValidation = projectSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    isArchived: true,
    pinnedAt: true,
    isPinned: true,
});

//* Getting data field filtration
export const projectCreateInputValidation = projectSchema
    .omit({
        id: true,
        createdAt: true,
        updatedAt: true,
        ownerId: true,
        isArchived: true,
        pinnedAt: true,
        isPinned: true,
    })
    .extend({
        tagIds: z.array(z.number().positive()).default([])
    });

//* Sending data field filtration
export const projectCreateOutputSchema = projectSchema.omit({
    updatedAt: true,
    ownerId: true,
});