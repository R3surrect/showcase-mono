import { hasTagsReferenceMixin } from "../../../../../shared/validations/mixins.js";
import { taskSchema } from "../tasks.schema.js";

export const taskUpdateOutputSchema = taskSchema
    .omit({
        createdAt: true,
        updatedAt: true,
        ownerId: true,
        pinnedAt: true,
    });

export const taskUpdateValidation = taskSchema
    .omit({
        id: true,
        createdAt: true,
        ownerId: true,
        pinnedAt: true,
    })
    .extend(hasTagsReferenceMixin)
    .partial();

export const taskDbUpdateValidation = taskSchema
    .omit({
        createdAt: true,
        pinnedAt: true,
    })
    .extend(hasTagsReferenceMixin)
    .partial();