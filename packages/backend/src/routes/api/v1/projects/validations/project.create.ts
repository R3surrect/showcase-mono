import { tagSchema } from "../../templates/tags/tag.schema.js";
import { projectSchema } from "../projects.schema.js";

export const projectCreateValidation = projectSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
})

export const projectCreateClientPayloadSchema = tagSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    ownerId: true,
})