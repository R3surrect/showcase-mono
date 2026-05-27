import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import type { TextAlign } from "../_shared/system.types";
import type { AS_TYPES, COLOR_TYPES, SIZE_TYPES, WEIGHTS_TYPES } from "./Text.constants";

export type As = typeof AS_TYPES[number];
export type Weights = typeof WEIGHTS_TYPES[number];
export type Sizes = typeof SIZE_TYPES[number];
export type Colors = typeof COLOR_TYPES[number];

interface TextBaseProps<T extends ElementType> {
    as?: T;
    weight?: Weights;
    size?: Sizes;
    color?: Colors;
    align?: TextAlign;
    children: ReactNode;
}

export type TextProps<T extends ElementType> =
    TextBaseProps<T> &
    Omit<ComponentPropsWithoutRef<T>, keyof TextBaseProps<T> | 'style' | 'className'>;

export interface FontVariables extends React.CSSProperties {
    '--text-weight': number;
    '--text-size': string;
    '--text-color': string;
}