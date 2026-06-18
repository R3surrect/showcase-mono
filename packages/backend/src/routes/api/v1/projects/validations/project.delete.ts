import { projectSchema } from "../projects.schema.js";

export const projectDeleteValidation = projectSchema.pick({
    id: true,
})