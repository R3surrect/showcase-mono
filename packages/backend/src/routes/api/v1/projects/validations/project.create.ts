import { projectSchema } from "../projects.schema.js";
import { archivableEntityFields, baseEntityFields, hasTagsReferenceMixin, pinnableEntityFields } from "#/shared/validations/mixins.js";

export const projectEntityOmitFields = {
    ...baseEntityFields,
    ...pinnableEntityFields,
    ...archivableEntityFields,
} as const;

//* Getting data field filtration
export const projectCreateInputValidation = projectSchema
    .omit(projectEntityOmitFields)
    .omit({ ownerId: true })
    .extend(hasTagsReferenceMixin);

//* The database requires an additional ownerId field
export const projectCreateDbInputValidation = projectSchema
    .omit(projectEntityOmitFields)
    .extend(hasTagsReferenceMixin);

//* Sending data field filtration
export const projectCreateOutputSchema = projectSchema.omit({
    updatedAt: true,
    ownerId: true,
});