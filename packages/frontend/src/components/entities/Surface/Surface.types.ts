import type { HTMLMotionProps } from "motion/react";
import type { VARIANT_TYPES } from "./Surface.constants";
import type { AxisSizeVariations, Overflows, Size } from "@/components/entities/_shared/system.types"; 

export type Variants = typeof VARIANT_TYPES[number];

export interface SurfaceProps extends Omit<HTMLMotionProps<'div'>, 'className' | 'style'> {
    variant?: Variants;
    cornerRadius?: Size;
    isAnimated?: boolean;
    color?: string;
    height?: AxisSizeVariations;
    width?: AxisSizeVariations;
    overflow?: Overflows;
}

export interface SurfaceVars extends React.CSSProperties {
    '--surface-color'?: string;
    '--surface-width'?: string;
    '--surface-height'?: string;
    '--surface-overflow'?: string;
}