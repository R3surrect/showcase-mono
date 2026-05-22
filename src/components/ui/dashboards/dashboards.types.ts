import type { BarProps, LineProps, PieProps, TooltipProps } from "recharts";

export type chartsPartial = Partial<TooltipProps>
    & Partial<BarProps>
    & Partial<LineProps>
    & Partial<PieProps>