import type { LucideIcon } from "lucide-react";
import type { Align, Justify } from "@components/ui/_shared/system.types";

export const VARIANT_TYPES = ['full', 'minimal', 'outline'] as const;
export const ALIGN_TYPES = ['left', 'center', 'right'] as const;

export type Variants = typeof VARIANT_TYPES[number];
export type Alignment = typeof ALIGN_TYPES[number];

interface BaseDashboardStatBlockProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style' | 'className'> {
    label: string;
    isAnimated?: boolean;
    value: string | number;
    valueLabel?: string;
    subtitle: string;
    alignment?: Alignment;
    justify?: Justify;
    align?: Exclude<Align, 'stretch'>;
}

export type DashboardStatBlockProps<T extends Variants = Variants> = BaseDashboardStatBlockProps & {
    variant?: T;
} & (
        T extends 'full'
        ? { iconObj: { icon: LucideIcon; color: string } }
        : { iconObj?: never }
    )

export interface IconColor extends React.CSSProperties {
    '--icon-color': string;
}
