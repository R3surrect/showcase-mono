import { AXIS_SIZE_TYPES, BOX_ALIGN_TYPES } from "../_shared/system.constants";

export const STACK_WIDTH_TYPES = [...AXIS_SIZE_TYPES, 'auto'] as const;
export const STACK_ALIGN_TYPES = [...BOX_ALIGN_TYPES, 'baseline'] as const;