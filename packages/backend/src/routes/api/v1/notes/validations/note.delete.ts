import { noteSchema } from "../notes.schema.js";

export const noteDeleteValidation = noteSchema.pick({
    id: true,
});

export const noteDbDeleteValidation = noteSchema.pick({
    id: true,
    ownerId: true
});