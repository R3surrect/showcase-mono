import type { HTMLMotionProps } from "motion/react";
import type { VARIANT_TYPES } from "./Surface.constants";
import type { AxisSizeVariations, Size } from "@/components/entities/_shared/system.types"; 

export type Variants = typeof VARIANT_TYPES[number];

export interface SurfaceProps extends Omit<HTMLMotionProps<'div'>, 'className' | 'style'> {
    variant?: Variants;
    cornerRadius?: Size;
    isAnimated?: boolean;
    color?: string;
    height?: AxisSizeVariations;
}

export interface SurfaceVars extends React.CSSProperties {
    '--surface-color': string;
}