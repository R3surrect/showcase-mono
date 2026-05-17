export const GAP_TYPES = ['sm', 'md', 'lg'] as const;
export const ALIGN_TYPES = ['start', 'center', 'stretch', 'end'] as const;
export const DIRECTION_TYPES = ['row', 'column'] as const;
export const JUSTIFY_TYPES = ['start', 'center', 'end', 'space-around', 'space-between', 'space-evenly'] as const;

export type Gap = typeof GAP_TYPES[number];
export type Align = typeof ALIGN_TYPES[number];
export type Direction = typeof DIRECTION_TYPES[number]
export type Justify = typeof JUSTIFY_TYPES[number]
