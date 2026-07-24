import type z from "zod";
import type { tagSchema } from "./tag.schema.js";
import type {
    tagCreateInputValidation,
    tagCreateOutputValidation,
    tagCreateDbInputValidation,
    categoryTagOutput,
    systemTagOutput
} from "./validations/tag.create.js";
import type { tagUpdateValidation } from "./validations/tag.update.js";
import type { tagDbDeleteValidation, tagDeleteValidation } from "./validations/tag.delete.js";

//* GENERAL

export type Tag = z.infer<typeof tagSchema>;
export type TagId = Tag['id'];
export type TagOwnerId = Tag['ownerId'];

//* INPUT

export type TagDbCreateInput = z.infer<typeof tagCreateDbInputValidation>;
export type TagCreateInput = z.infer<typeof tagCreateInputValidation>;
export type TagUpdateInput = z.infer<typeof tagUpdateValidation>;
export type TagDbDeleteInput = z.infer<typeof tagDbDeleteValidation>;
export type TagDeleteInput = z.infer<typeof tagDeleteValidation>;

//* OUTPUT

export type TagGetOutput = Omit<Tag, 'ownerId' | 'updatedAt'>
export type TagCreateOutput = z.infer<typeof tagCreateOutputValidation>
export type TagUpdateOutput = TagCreateOutput;

export type CategoryTagOutput = z.infer<typeof categoryTagOutput>;
export type PriorityTagOutput = z.infer<typeof systemTagOutput>
export type StatusTagOutput = z.infer<typeof systemTagOutput>

