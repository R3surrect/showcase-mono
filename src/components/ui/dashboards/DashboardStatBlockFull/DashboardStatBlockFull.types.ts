import type { LucideIcon } from "lucide-react";
import type { Justify, PhysicalAlignment } from "@components/ui/_shared/system.types";
import type { HTMLMotionProps } from "motion/react";

export const VARIANT_TYPES = ['full', 'minimal', 'outline'] as const;
export type Variants = typeof VARIANT_TYPES[number];

export interface DashboardStatBlockFullProps extends Omit<HTMLMotionProps<'div'>, 'style' | 'className'> {
    label: string;
    isAnimated?: boolean;
    value: string | number;
    valueLabel?: string;
    subtitle: string;
    alignment?: PhysicalAlignment;
    iconObj: { icon: LucideIcon; color: string }
    justify?: Justify;
}

export interface IconColor extends React.CSSProperties {
    '--icon-color': string;
}
