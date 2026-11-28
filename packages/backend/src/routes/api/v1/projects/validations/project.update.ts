import { projectSchema } from "../projects.schema.js";

export const projectUpdateValidation = projectSchema
    .omit({
        id: true,
        ownerId: true,
        createdAt: true,
        pinnedAt: true,
    }).partial();

export const projectDbUpdateValidation = projectSchema
    .omit({
        createdAt: true,
        pinnedAt: true,
    })
    .partial()
    .required({
        id: true,
        ownerId: true,
    });

export const projectUpdateOutputSchema = projectSchema.omit({
    updatedAt: true,
    ownerId: true,
});