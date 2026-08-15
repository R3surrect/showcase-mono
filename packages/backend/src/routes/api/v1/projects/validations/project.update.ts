import { projectSchema } from "../projects.schema.js";

export const projectUpdateValidation = projectSchema
    .omit({
        createdAt: true,
        ownerId: true,
        pinnedAt: true,
    }).partial();

export const projectDbUpdateValidation = projectSchema
    .omit({
        createdAt: true,
        pinnedAt: true,
    }).partial();

export const projectUpdateOutputSchema = projectSchema.omit({
    updatedAt: true,
    ownerId: true,
});