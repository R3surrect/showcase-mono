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
    .extend(hasTagsReferenceMixin)
    .refine(
        (data) => {
            if (!data.notifyAt || !data.deadline) return true;

            const notifyDate = new Date(data.notifyAt);
            const deadlineDate = new Date(data.deadline);

            if (notifyDate >= deadlineDate) return false;

            return true;
        },
        {
            message: 'Notify date must be in the future and before deadline',
            path: ['notifyAt']
        }
    );

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