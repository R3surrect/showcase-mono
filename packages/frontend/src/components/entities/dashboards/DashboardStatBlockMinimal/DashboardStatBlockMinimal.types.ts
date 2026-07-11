import type { HTMLMotionProps } from "motion/react";
import type { Variants } from "../../Surface/Surface.types";

export interface DashboardStatBlockMinimalProps extends Omit<HTMLMotionProps<'div'>, 'style' | 'className'> {
    title: string;
    value: string;
    valueLabel?: string;
    subtitle: string;
    variant?: Variants;
}