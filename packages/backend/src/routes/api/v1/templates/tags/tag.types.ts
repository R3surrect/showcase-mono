import type z from "zod";
import type { tagColorSchema, tagSchema } from "./tag.schema.js";
import type { tagCreateValidation } from "./validations/tag.create.validation.js";
import type { tagUpdateValidation } from "./validations/tag.update.validation.js";
import type { tagDeleteValidation } from "./validations/tag.delete.validation.js";

export type Tag = z.infer<typeof tagSchema>;
export type TagId = Tag['id'];

export type TagCreateInput = z.infer<typeof tagCreateValidation>;
export type TagUpdateInput = z.infer<typeof tagUpdateValidation>;
export type TagDeleteInput = z.infer<typeof tagDeleteValidation>;

export type TagColorSchema = z.infer<typeof tagColorSchema>;

export type TagGetClientPayload = Omit<Tag, 'ownerId' | 'updatedAt'>;
export type TagCreateClientPayload = Omit<Tag, 'ownerId' | 'updatedAt'>

export type TagResponse = { success: true, tag: Tag };
export type TagListResponse = { success: true, tag: Tag[] };
