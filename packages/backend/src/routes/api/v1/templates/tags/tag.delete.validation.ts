import { tagSchema } from "./tag.schema.js";

export const tagDeleteValidation = tagSchema.pick({
    id: true,
})
