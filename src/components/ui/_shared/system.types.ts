// 1. Базовые атомарные константы (ядро системы)
export const SIZE_TYPES = ['sm', 'md', 'lg'] as const;
export const DIRECTION_TYPES = ['row', 'column', 'row-reverse', 'column-reverse'] as const;

export const BASE_ALIGN_TYPES = ['start', 'center', 'end'] as const;

export const BOX_ALIGN_TYPES = [...BASE_ALIGN_TYPES, 'stretch'] as const;
export const JUSTIFY_TYPES = [...BASE_ALIGN_TYPES, 'space-around', 'space-between', 'space-evenly'] as const;
export const TEXT_ALIGN_TYPES = [...BASE_ALIGN_TYPES, 'justify'] as const;

export type Gap = typeof SIZE_TYPES[number];
export type Direction = typeof DIRECTION_TYPES[number];

export type BaseAlignment = typeof BASE_ALIGN_TYPES[number];
export type BoxAlignment = typeof BOX_ALIGN_TYPES[number];
export type Justify = typeof JUSTIFY_TYPES[number];
export type TextAlign = typeof TEXT_ALIGN_TYPES[number];