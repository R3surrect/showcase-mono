import { taskSchema } from "../tasks.schema.js";

export const taskUpdateOutputSchema = taskSchema
    .omit({
        createdAt: true,
        updatedAt: true,
        ownerId: true,
        pinnedAt: true,
    });

export const taskUpdateValidation = taskSchema
    .omit({
        createdAt: true,
        ownerId: true,
        pinnedAt: true,
    }).partial();

export const taskDbUpdateValidation = taskSchema
    .omit({
        createdAt: true,
        pinnedAt: true,
    }).partial();