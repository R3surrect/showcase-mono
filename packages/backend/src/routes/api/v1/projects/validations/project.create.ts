import z from "zod";
import { projectSchema } from "../projects.schema.js";

const projectTypeExtension = {
    tagIds: z.array(z.number().positive()).default([]),
}

const baseValidationFields = {
    id: true,
    createdAt: true,
    updatedAt: true,
    isArchived: true,
    pinnedAt: true,
    isPinned: true,
} as const;

//* The database requires an additional ownerId field
export const projectCreateDbInputValidation = projectSchema
    .omit(baseValidationFields)
    .extend(projectTypeExtension);

//* Getting data field filtration
export const projectCreateInputValidation = projectSchema
    .omit({ ...baseValidationFields, ownerId: true })
    .extend(projectTypeExtension);

//* Sending data field filtration
export const projectCreateOutputSchema = projectSchema.omit({
    updatedAt: true,
    ownerId: true,
});