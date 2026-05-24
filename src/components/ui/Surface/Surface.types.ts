import type { HTMLMotionProps } from "motion/react";
import type { SIZE_TYPES } from "../_shared/system.types";

export const VARIANT_TYPES = ['glass', 'solid', 'outline'] as const;

export type Radiuses = typeof SIZE_TYPES[number];
export type Variants = typeof VARIANT_TYPES[number];

export interface SurfaceProps extends Omit<HTMLMotionProps<'div'>, 'className' | 'style'> {
    variant?: Variants;
    cornerRadius?: Radiuses;
    isAnimated?: boolean;
    color?: string;
}

export interface SurfaceVars extends React.CSSProperties {
    '--surface-color': string;
}