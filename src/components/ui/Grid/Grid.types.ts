export const COLUMN_TYPES = [1, 2, 3, 4, 5, 6] as const;
export const ALIGN_ITEMS_TYPES = ['start', 'center', 'end', 'stretch'] as const;
export const HEIGHT_TYPES = ['fit-content', 'max'] as const;

export type Columns = typeof COLUMN_TYPES[number];
export type AlignItems = typeof ALIGN_ITEMS_TYPES[number];
export type Heights = typeof HEIGHT_TYPES[number];