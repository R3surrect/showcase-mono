import type z from "zod";
import type { tagSchema } from "./tag.schema.js";
import type { tagCreateInputSchema, tagCreateValidation } from "./validations/tag.create.validation.js";
import type { tagUpdateValidation } from "./validations/tag.update.validation.js";
import type { tagDeleteValidation } from "./validations/tag.delete.validation.js";
import type { colorSchema } from "#/shared/validations/customizable.validation.js";

export type Tag = z.infer<typeof tagSchema>;
export type TagId = Tag['id'];

export type TagCreateInput = z.infer<typeof tagCreateValidation>;
export type TagUpdateInput = z.infer<typeof tagUpdateValidation>;
export type TagDeleteInput = z.infer<typeof tagDeleteValidation>;
export type TagColorSchema = z.infer<typeof colorSchema>;

export type TagCreateClientPayload = z.infer<typeof tagCreateInputSchema>

export type TagGetClientPayload = Omit<Tag, 'ownerId' | 'updatedAt'>;
