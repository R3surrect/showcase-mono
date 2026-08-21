import { taskSchema } from "../tasks.schema.js";
import { archivableEntityFields, baseEntityFields, hasTagsReferenceMixin, pinnableEntityFields } from "#/shared/validations/mixins.js";

export const taskEntityOmitFields = {
    ...baseEntityFields,
    ...pinnableEntityFields,
    ...archivableEntityFields,
} as const

export const taskCreateInputValidation = taskSchema
    .omit(taskEntityOmitFields)
    .omit({ ownerId: true })
    .extend(hasTagsReferenceMixin);

export const taskCreateDbInputValidation = taskSchema
    .omit(taskEntityOmitFields)
    .extend(hasTagsReferenceMixin);

export const taskCreateOutputSchema = taskSchema
    .omit({
        createdAt: true,
        updatedAt: true,
        ownerId: true,
        pinnedAt: true,
    });