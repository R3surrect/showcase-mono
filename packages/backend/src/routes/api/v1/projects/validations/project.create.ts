import { projectSchema } from "../projects.schema.js";

//* The database requires an additional ownerId field
export const projectCreateDbInputValidation = projectSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});

//* Getting data field filtration
export const projectCreateInputValidation = projectSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    ownerId: true,
})

//* Sending data field filtration
export const projectCreateOutputSchema = projectSchema.omit({
    updatedAt: true,
    ownerId: true,
});