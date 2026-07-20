import type { HslColor } from "colord";

export const BASE_SIZE_TYPES = ['none', 'sm', 'md', 'lg'] as const;
export const DIRECTION_TYPES = ['row', 'column', 'row-reverse', 'column-reverse'] as const;
export const BASE_ALIGN_TYPES = ['start', 'center', 'end'] as const;
export const WEIGHTS_TYPES = ["thin", "regular", "bold", "bolder"] as const;
export const OPACITY_TYPES = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] as const;
export const AXIS_SIZE_TYPES = ['fit', 'max'] as const;
export const SIZE_TYPES = [1, 2, 3, 4, 5, 6, 7] as const;
export const OVERFLOW_TYPES = ['auto', 'hidden', 'visible', 'scroll'] as const;

export const BOX_ALIGN_TYPES = [...BASE_ALIGN_TYPES, 'stretch'] as const;
export const JUSTIFY_TYPES = [...BASE_ALIGN_TYPES, 'space-around', 'space-between', 'space-evenly'] as const;
export const TEXT_ALIGN_TYPES = [...BASE_ALIGN_TYPES, 'justify'] as const;

export const DEFAULT_HSL_COLOR: HslColor = { h: 207, s: 10, l: 42 } as const;