import type { Ref } from "react";
import type { Direction, Size, Justify, AxisSizeVariations } from "../_shared/system.types";
import type { STACK_ALIGN_TYPES, STACK_WIDTH_TYPES } from "./Stack.constants";

export interface StackProps extends Omit<React.ComponentPropsWithRef<'div'>, 'style' | 'className'> {
    children?: React.ReactNode;
    gap?: Size;
    align?: StackAlign;
    direction?: Direction;
    wrap?: boolean;
    justify?: Justify;
    width?: StackWidth;
    ref?: Ref<HTMLDivElement>;
    height?: AxisSizeVariations;
}

export interface StackVars extends React.CSSProperties {
    '--stack-gap': string;
    '--stack-align': StackAlign;
    '--stack-direction': Direction;
    '--stack-justify': Justify;
}

export type StackWidth = typeof STACK_WIDTH_TYPES[number];
export type StackAlign = typeof STACK_ALIGN_TYPES[number];