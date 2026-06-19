import type z from "zod";
import type { tagSchema } from "./tag.schema.js";
import type { tagCreateInputSchema, tagCreateOutputSchema, tagCreateValidation } from "./validations/tag.create.js";
import type { tagUpdateValidation } from "./validations/tag.update.js";
import type { tagDeleteValidation } from "./validations/tag.delete.js";
import type { colorSchema } from "#/shared/validations/customizable.validation.js";

export type Tag = z.infer<typeof tagSchema>;

//* INPUT

export type TagCreateInput = z.infer<typeof tagCreateValidation>;
export type TagUpdateInput = z.infer<typeof tagUpdateValidation>;
export type TagDeleteInput = z.infer<typeof tagDeleteValidation>;
export type TagColorSchema = z.infer<typeof colorSchema>;

export type TagId = Tag['id'];
export type TagOwnerId = Tag['ownerId'];

//* OUTPUT
export type TagCreateClientPayload = z.infer<typeof tagCreateOutputSchema>
export type TagGetInput = z.infer<typeof tagCreateInputSchema>;
