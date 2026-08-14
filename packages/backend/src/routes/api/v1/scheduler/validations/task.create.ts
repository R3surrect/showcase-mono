import { taskSchema } from "../scheduler.schema.js";
import { archivableEntityFields, baseEntityFields, hasProjectsReferenceMixin, hasTagsReferenceMixin, pinnableEntityFields } from "#/shared/validations/mixins.js";

export const taskEntityOmitFields = {
    ...baseEntityFields,
    ...pinnableEntityFields,
    ...archivableEntityFields,
} as const

export const taskCreateInputValidation = taskSchema
    .omit(taskEntityOmitFields)
    .omit({ ownerId: true })
    .extend(hasProjectsReferenceMixin)
    .extend(hasTagsReferenceMixin);

export const taskCreateDbInputValidation = taskSchema
    .omit(taskEntityOmitFields)
    .extend(hasProjectsReferenceMixin)
    .extend(hasTagsReferenceMixin);

export const taskCreateOutput = taskSchema
    .omit({
        createdAt: true,
        updatedAt: true,
        ownerId: true,
        pinnedAt: true,
    })