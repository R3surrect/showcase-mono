import type { AS_TYPES, COLOR_TYPES, SIZE_TYPES, WEIGHTS_TYPES } from "./Text.constants";

export type As = typeof AS_TYPES[number];
export type Weights = typeof WEIGHTS_TYPES[number];
export type Sizes = typeof SIZE_TYPES[number];
export type Colors = typeof COLOR_TYPES[number];

export interface TextProps extends Omit<React.HTMLAttributes<HTMLElement>, 'style' | 'className'> {
    as?: As;
    weight?: Weights;
    size?: Sizes;
    color?: Colors;
    children: React.ReactNode;
}

export interface FontVariables extends React.CSSProperties {
    '--text-weight': number;
    '--text-size': string;
    '--text-color': string;
}