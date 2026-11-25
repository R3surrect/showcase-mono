import { archivableEntityFields, baseEntityFields, pinnableEntityFields } from "../../../../../shared/validations/mixins.js";
import { noteSchema } from "../notes.schema.js";

export const noteEntityOmitFields = {
    ...baseEntityFields,
    ...pinnableEntityFields,
    ...archivableEntityFields,
};

export const noteCreateInputValidation = noteSchema
    .omit(noteEntityOmitFields)
    .omit({ ownerId: true });

export const noteDbCreateInputValidation = noteSchema
    .omit(noteEntityOmitFields);

export const noteCreateOutputSchema = noteSchema
    .omit({
        createdAt: true,
        updatedAt: true,
        ownerId: true,
        pinnedAt: true,
    })