import { projectSchema } from "../projects.schema.js";

export const projectUpdateValidation = projectSchema
    .pick({
        label: true,
        emoji: true,
        color: true,
        details: true,
        priority: true,
        isPinned: true,
        isArchived: true,
    })
    .partial()