import type { Ref } from "react";
import type { Direction, Size, Justify, StackAlign, StackWidth } from "../_shared/system.types";

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