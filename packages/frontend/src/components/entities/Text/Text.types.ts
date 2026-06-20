import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import type { Sizes, TextAlign, Weights } from "../_shared/system.types";
import type { AS_TYPES, COLOR_TYPES } from "./Text.constants";

export type As = typeof AS_TYPES[number];
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