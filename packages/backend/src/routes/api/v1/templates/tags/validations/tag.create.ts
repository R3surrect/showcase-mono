import { tagSchema } from "../tag.schema.js";

//* The database requires an additional ownerId field
export const tagCreateDbInputValidation = tagSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
})

//* Sending data field filtration
export const tagCreateOutputValidation = tagSchema.omit({
    updatedAt: true,
    ownerId: true,
})

//* Getting data field filtration
export const tagCreateInputValidation = tagSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    ownerId: true,
})

export const categoryTagOutput = tagSchema.pick({
    id: true,
    category: true,
    color: true,
});