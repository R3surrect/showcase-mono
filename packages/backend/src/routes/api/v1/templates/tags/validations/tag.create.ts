import { tagSchema } from "../tag.schema.js";

export const tagCreateValidation = tagSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
})

export const tagCreateOutputSchema = tagSchema.omit({
    createdAt: true,
    updatedAt: true,
    ownerId: true,
})

export const tagCreateInputSchema = tagSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    ownerId: true,
})
