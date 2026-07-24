import { TAG_TYPES } from "@showcase-mono/backend/routes/api/v1/templates/tags/tag.schema";
export const VARIANT_TYPES = ['default', 'system', ...TAG_TYPES] as const;