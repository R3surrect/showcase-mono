export const SIZE_TYPES = ['sm', 'md', 'lg'] as const;
export const PHYSICAL_ALIGN_TYPES = ['left', 'center', 'right'] as const;
export const LOGICAL_ALIGN_TYPES = ['start', 'center', 'end', 'stretch'] as const;
export const DIRECTION_TYPES = ['row', 'column', 'row-reverse', 'column-reverse'] as const;
export const JUSTIFY_TYPES = ['start', 'center', 'end', 'space-around', 'space-between', 'space-evenly'] as const;
export const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify'] as const;

export type PhysicalAlignment = typeof PHYSICAL_ALIGN_TYPES[number];
export type LogicalAlignment = typeof LOGICAL_ALIGN_TYPES[number];

export type Gap = typeof SIZE_TYPES[number];
export type Direction = typeof DIRECTION_TYPES[number];
export type Justify = typeof JUSTIFY_TYPES[number];
export type TextAlign = typeof TEXT_ALIGN_TYPES[number];

