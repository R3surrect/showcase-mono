import type { ComponentPropsWithoutRef, ComponentPropsWithRef } from "react";
import type { HslColor } from "colord";
import type {
    BASE_ALIGN_TYPES,
    BOX_ALIGN_TYPES,
    DIRECTION_TYPES,
    JUSTIFY_TYPES,
    OPACITY_TYPES,
    BASE_SIZE_TYPES,
    TEXT_ALIGN_TYPES,
    AXIS_SIZE_TYPES,
    WEIGHTS_TYPES,
    SIZE_TYPES,
    OVERFLOW_TYPES
} from "./system.constants";

export type Size = typeof BASE_SIZE_TYPES[number];
export type Direction = typeof DIRECTION_TYPES[number];
export type BaseAlignment = typeof BASE_ALIGN_TYPES[number];
export type BoxAlignment = typeof BOX_ALIGN_TYPES[number];
export type Justify = typeof JUSTIFY_TYPES[number];
export type TextAlign = typeof TEXT_ALIGN_TYPES[number];
export type OpacityLevel = typeof OPACITY_TYPES[number];
export type AxisSizeVariations = typeof AXIS_SIZE_TYPES[number] | (string & {});
export type Weights = typeof WEIGHTS_TYPES[number];
export type Sizes = typeof SIZE_TYPES[number];
export type Overflows = typeof OVERFLOW_TYPES[number];

export interface ColorSet {
    id: string;
    color: HslColor;
};

export type ResponsiveObj<T> = T | { base?: T, md?: T, lg?: T }

//* DOM frequently using types

export type DivUiComponent = Omit<ComponentPropsWithoutRef<'div'>, 'style' | 'className'>;
export type DivUiRefComponent = Omit<ComponentPropsWithRef<'div'>, 'style' | 'className'>;

export type InputUiRefComponent = Omit<ComponentPropsWithRef<'input'>, 'style' | 'clasName'>;