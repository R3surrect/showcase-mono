import { taskSchema } from "../tasks.schema.js";
import { archivableEntityFields, baseEntityFields, hasTagsReferenceMixin, pinnableEntityFields } from "#/shared/validations/mixins.js";
import z from "zod";

export const taskEntityOmitFields = {
    ...baseEntityFields,
    ...pinnableEntityFields,
    ...archivableEntityFields,
} as const

export const taskCreateInputValidation = taskSchema
    .omit(taskEntityOmitFields)
    .omit({ ownerId: true })
    .extend(hasTagsReferenceMixin)
    .refine((data) => {
        if (!data.notifyAt) return true;
        return new Date(data.notifyAt) < new Date(),
        {
            message: 'Notify date cannot be in the past',
            path: ['notifyAt']
        }
    });

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