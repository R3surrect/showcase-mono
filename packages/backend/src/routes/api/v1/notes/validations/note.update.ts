import { noteSchema } from "../notes.schema.js";

export const noteUpdateOutputSchema = noteSchema
    .omit({
        createdAt: true,
        updatedAt: true,
        ownerId: true,
        pinnedAt: true
    });

export const noteUpdateValidation = noteSchema
    .omit({
        id: true,
        createdAt: true,
        ownerId: true,
        pinnedAt: true
    })
    .partial();

export const noteDbUpdateValidation = noteSchema
    .omit({
        createdAt: true,
        pinnedAt: true
    })
    .partial();