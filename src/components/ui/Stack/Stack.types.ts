import type { Ref } from "react";
import type { LogicalAlignment, Direction, Gap, Justify } from "../_shared/system.types";

export interface StackProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style' | 'className'> {
    children: React.ReactNode;
    gap?: Gap;
    align?: LogicalAlignment;
    direction?: Direction;
    wrap?: boolean;
    justify?: Justify;
    ref?: Ref<HTMLDivElement>;
}

export interface StackVars extends React.CSSProperties {
    '--stack-gap': string,
    '--stack-align': LogicalAlignment;
    '--stack-direction': Direction;
    '--stack-justify': Justify;
}