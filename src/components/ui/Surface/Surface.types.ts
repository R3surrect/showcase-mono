import type { HTMLMotionProps } from "motion/react";
import type { SIZE_TYPES } from "../_shared/system.types";

export const VARIANT_TYPES = ['glass', 'solid', 'outline'] as const;
export const HEIGHT_TYPES = ['fit-content', 'max'] as const;
export const ALIGN_TYPES = ['start', 'center', 'end'] as const;

export type Radiuses = typeof SIZE_TYPES[number];
export type Variants = typeof VARIANT_TYPES[number];
export type Heights = typeof HEIGHT_TYPES[number];
export type Alignment = typeof ALIGN_TYPES[number];

export interface SurfaceProps extends Omit<HTMLMotionProps<'div'>, 'className' | 'style'> {
    variant?: Variants;
    cornerRadius?: Radiuses;
    height?: Heights;
    align?: Alignment;
    isAnimated?: boolean;
    color?: string;
}

export interface SurfaceVars extends React.CSSProperties {
    '--surface-color': string;
}