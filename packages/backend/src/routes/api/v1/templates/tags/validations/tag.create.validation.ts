import { tagSchema } from "../tag.schema.js";

export const tagCreateValidation = tagSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
})