import type { LineProps } from "recharts";

export const lineProps: Partial<LineProps> = {
    strokeWidth: 3,
    animationEasing: 'ease-in-out',
    cursor: 'pointer',
}

export interface DataProps { day: string; completed: number; outdated: number; all: number }

export interface ChartProps {
    dataKey: string;
    name: string;
    stroke: string;
}

