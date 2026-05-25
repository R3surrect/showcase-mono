import type { Ref } from "react";
import type { Direction, Size, Justify, StackAlign } from "../_shared/system.types";

export const WIDTH_TYPES = ['full', 'fit', 'auto'] as const;

export type StackWidth = typeof WIDTH_TYPES[number];

export interface StackProps extends Omit<React.ComponentPropsWithRef<'div'>, 'style' | 'className'> {
    children: React.ReactNode;
    gap?: Size;
    align?: StackAlign;
    direction?: Direction;
    wrap?: boolean;
    justify?: Justify;
    width?: StackWidth;
    ref?: Ref<HTMLDivElement>;
}

export interface StackVars extends React.CSSProperties {
    '--stack-gap': string;
    '--stack-align': StackAlign;
    '--stack-direction': Direction;
    '--stack-justify': Justify;
}