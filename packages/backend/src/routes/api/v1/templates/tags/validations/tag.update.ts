import { tagSchema } from "../tag.schema.js";

export const tagUpdateValidation = tagSchema
    .pick({
        label: true,
        color: true,
    })
    .partial();
