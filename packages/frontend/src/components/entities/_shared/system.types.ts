import type { ComponentPropsWithRef, HTMLAttributes } from "react";
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
    SIZE_TYPES
} from "./system.constants";

export type Size = typeof BASE_SIZE_TYPES[number];
export type Direction = typeof DIRECTION_TYPES[number];
export type BaseAlignment = typeof BASE_ALIGN_TYPES[number];
export type BoxAlignment = typeof BOX_ALIGN_TYPES[number];
export type Justify = typeof JUSTIFY_TYPES[number];
export type TextAlign = typeof TEXT_ALIGN_TYPES[number];
export type OpacityLevel = typeof OPACITY_TYPES[number];
export type AxisSizeVariations = typeof AXIS_SIZE_TYPES[number];
export type Weights = typeof WEIGHTS_TYPES[number];
export type Sizes = typeof SIZE_TYPES[number];

//* DOM frequently using types

export type DivUiComponent = Omit<HTMLAttributes<'div'>, 'style' | 'className'>;
export type DivUiRefComponent = Omit<ComponentPropsWithRef<'div'>, 'style' | 'className'>

export type InputUiComponent = Omit<HTMLAttributes<'input'>, 'style' | 'className'>;
export type InputUiRefComponent = Omit<ComponentPropsWithRef<'input'>, 'style' | 'className'>