import type z from "zod";
import type { noteSchema } from "./notes.schema.js";
import type { noteCreateInputValidation, noteCreateOutputSchema, noteDbCreateInputValidation } from "./validations/note.create.js";
import type { noteDbUpdateValidation, noteUpdateOutputSchema, noteUpdateValidation } from "./validations/note.update.js";
import type { noteDbDeleteValidation, noteDeleteValidation } from "./validations/note.delete.js";

export type Note = z.infer<typeof noteSchema>;
export type NoteId = Note['id'];
export type NoteOwnerId = Note['ownerId'];

export type NoteBaseOutput = Omit<Note, 'ownerId' | 'updatedAt'>;

export type NoteCreateInput = z.infer<typeof noteCreateInputValidation>;
export type NoteCreateInputDirty = z.input<typeof noteCreateInputValidation>;
export type NoteDbCreateInput = z.infer<typeof noteDbCreateInputValidation>;

export type NoteCreateOutput = z.infer<typeof noteCreateOutputSchema>;

export type NoteUpdateInput = z.infer<typeof noteUpdateValidation>;
export type NoteDbUpdateInput = z.infer<typeof noteDbUpdateValidation>;
export type NoteUpdateOutput = z.infer<typeof noteUpdateOutputSchema>;

export type NoteDeleteInput = z.infer<typeof noteDeleteValidation>;
export type NoteDbDeleteInput = z.infer<typeof noteDbDeleteValidation>;