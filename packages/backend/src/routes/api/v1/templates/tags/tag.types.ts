import type z from "zod";
import type { tagSchema } from "./tag.schema.js";
import type { tagCreateValidation } from "./tag.create.validation.js";
import type { tagUpdateValidation } from "./tag.update.validation.js";
import type { tagDeleteValidation } from "./tag.delete.validation.js";

export type Tag = z.infer<typeof tagSchema>;
export type TagId = Tag['id'];

export type TagCreateInput = z.infer<typeof tagCreateValidation>;
export type TagUpdateInput = z.infer<typeof tagUpdateValidation>;
export type TagDeleteInput = z.infer<typeof tagDeleteValidation>;

export type TagClientPayload = Omit<z.infer<typeof tagSchema>, 'ownerId' | 'updatedAt'>;

export type TagResponse = { success: true, tag: Tag };
export type TagListResponse = { success: true, tag: Tag[] };