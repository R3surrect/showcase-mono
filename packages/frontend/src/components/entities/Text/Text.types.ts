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
    width?: string;
}

interface TextBaseWrapProps {
    truncate?: false;
    wrap: true;
}

interface TextBaseAutoProps {
    truncate?: true;
    wrap?: false;
}

export type TextProps<T extends ElementType> =
    TextBaseProps<T> &
    (TextBaseWrapProps | TextBaseAutoProps) &
    Omit<ComponentPropsWithoutRef<T>, keyof TextBaseProps<T> | 'style' | 'className'>;

export interface TextVars extends React.CSSProperties {
    '--text-weight': number;
    '--text-size': string;
    '--text-color': string;
    '--text-width': string;
    '--text-align': string;
}