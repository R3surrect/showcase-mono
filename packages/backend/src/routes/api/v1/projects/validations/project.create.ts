import { projectSchema } from "../projects.schema.js";

//* DB Input
export const projectCreateValidation = projectSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});

// * Client Output
export const projectCreateOutputSchema = projectSchema.omit({
    updatedAt: true,
    ownerId: true,
});
