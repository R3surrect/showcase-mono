import type { HslColor } from "colord";
import type { HTMLMotionProps } from "motion/react";

export interface Task {
    completed: number;
    pending: number;
    overdue: number;
    scheduled: number;
    inProgress: number;
}

export interface ProjectProps extends Omit<HTMLMotionProps<'div'>, 'color' | 'children'> {
    emoji?: string | React.ReactNode;
    label: string;
    color?: HslColor;
    isPinned?: boolean;
    details?: string | null;
    hasSurface?: boolean;
    // tasks: Task;
}

export interface ProjectVars extends React.CSSProperties {
    '--project-color'?: string;
}