import { projectSchema } from "../projects.schema.js";

export const projectDeleteValidation = projectSchema.pick({
    id: true,
});

export const projectDbDeleteValidation = projectSchema.pick({
    id: true,
    ownerId: true,
})