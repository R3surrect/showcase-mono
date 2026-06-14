import type {
    BASE_ALIGN_TYPES,
    BOX_ALIGN_TYPES,
    DIRECTION_TYPES,
    JUSTIFY_TYPES,
    OPACITY_TYPES,
    BASE_SIZE_TYPES,
    STACK_ALIGN_TYPES,
    TEXT_ALIGN_TYPES,
    HEIGHT_TYPES,
    STACK_WIDTH_TYPES
} from "./system.constants";

export type StackWidth = typeof STACK_WIDTH_TYPES[number];
export type Size = typeof BASE_SIZE_TYPES[number];
export type Direction = typeof DIRECTION_TYPES[number];
export type BaseAlignment = typeof BASE_ALIGN_TYPES[number];
export type BoxAlignment = typeof BOX_ALIGN_TYPES[number];
export type Justify = typeof JUSTIFY_TYPES[number];
export type TextAlign = typeof TEXT_ALIGN_TYPES[number];
export type StackAlign = typeof STACK_ALIGN_TYPES[number];
export type OpacityLevel = typeof OPACITY_TYPES[number];
export type Heights = typeof HEIGHT_TYPES[number];