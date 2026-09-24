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
    .omit({ tags: true })
    .extend(hasTagsReferenceMixin)
    .refine(
        (data) => {
            if (!data.notifyAt) return true;

            const notify = new Date(data.notifyAt);

            if (notify <= new Date()) return false;
            if (data.deadline && notify >= new Date(data.deadline)) return false;

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