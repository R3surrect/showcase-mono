import type { Ref } from "react";
import type { Direction, Size, Justify, AxisSizeVariations, Overflows } from "../_shared/system.types";
import type { STACK_ALIGN_TYPES, STACK_WIDTH_TYPES } from "./Stack.constants";

export interface StackProps {
    children?: React.ReactNode;
    gap?: Size;
    align?: StackAlign;
    direction?: Direction;
    wrap?: boolean;
    justify?: Justify;
    width?: StackWidth;
    ref?: Ref<HTMLDivElement>;
    height?: AxisSizeVariations;
    overflow?: Overflows;
}

export interface StackVars extends React.CSSProperties {
    '--stack-gap': string;
    '--stack-align': StackAlign;
    '--stack-direction': Direction;
    '--stack-justify': Justify;
    '--stack-overflow': Overflows;
}

export type StackWidth = typeof STACK_WIDTH_TYPES[number];
export type StackAlign = typeof STACK_ALIGN_TYPES[number];