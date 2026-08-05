import { TAG_TYPE_CONFIGS } from "@showcase-mono/backend/routes/api/v1/templates/tags/tag.schema";
export const VARIANT_TYPES = ['default', 'system', ...Object.keys(TAG_TYPE_CONFIGS)] as const;