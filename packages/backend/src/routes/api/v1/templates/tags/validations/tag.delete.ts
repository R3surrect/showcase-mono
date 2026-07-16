import { tagSchema } from "../tag.schema.js";

export const tagDbDeleteValidation = tagSchema.pick({
    id: true,
    ownerId: true,
});

export const tagDeleteValidation = tagSchema.shape.id;
