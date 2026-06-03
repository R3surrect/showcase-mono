import type { LucideIcon } from "lucide-react";
import type { BaseAlignment, Justify } from "@components/ui/_shared/system.types";
import type { HTMLMotionProps } from "motion/react";
import type { Variants } from "@components/ui/Surface/Surface.types";

export interface DashboardStatBlockFullProps extends Omit<HTMLMotionProps<'div'>, 'style' | 'className'> {
    label: string;
    isAnimated?: boolean;
    value: string | number;
    valueLabel?: string;
    subtitle: string;
    alignment?: BaseAlignment;
    iconObj: { icon: LucideIcon; color: string }
    justify?: Justify;
    variant?: Variants;
    iconPosition?: Omit<BaseAlignment, 'center'>;
    iconHasContainer?: boolean;
}

export interface IconColor extends React.CSSProperties {
    '--icon-color': string;
}
