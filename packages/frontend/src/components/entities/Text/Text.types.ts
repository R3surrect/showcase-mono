import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import type { Sizes, TextAlign, Weights } from "../_shared/system.types";
import type { AS_TYPES } from "./Text.constants";

export type As = typeof AS_TYPES[number];
// export type Colors = typeof COLOR_TYPES[number];

interface TextBaseProps<T extends ElementType> {
    as?: T;
    weight?: Weights;
    size?: Sizes;
    color?: string;
    align?: TextAlign;
    children: ReactNode;
}

export type TextProps<T extends ElementType> =
    TextBaseProps<T> &
    Omit<ComponentPropsWithoutRef<T>, keyof TextBaseProps<T> | 'style' | 'className'>;

export interface TextVars extends React.CSSProperties {
    '--text-weight': number;
    '--text-size': string;
    '--text-color': string;
}