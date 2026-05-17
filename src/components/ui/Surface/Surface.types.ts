import type { HTMLMotionProps } from "motion/react";

export const VARIANT_TYPES = ['glass', 'solid'] as const;
export const RADIUS_TYPES = ['sm', 'md', 'lg'] as const;
export const HEIGHT_TYPES = ['fit-content', 'max'] as const;
export const ALIGN_TYPES = ['start', 'center', 'end'] as const;

export type Radiuses = typeof RADIUS_TYPES[number];
export type Variants = typeof VARIANT_TYPES[number];
export type Heights = typeof HEIGHT_TYPES[number];
export type Alignment = typeof ALIGN_TYPES[number];

export interface SurfaceProps extends Omit<HTMLMotionProps<'div'>, 'className' | 'style'> {
    variant?: Variants;
    cornerRadius?: Radiuses;
    height?: Heights;
    align?: Alignment;
}
