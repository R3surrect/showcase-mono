import type {
    BarProps,
    LegendProps,
    LineProps,
    PieProps,
    TooltipProps,
    XAxisProps,
    YAxisProps
} from "recharts";

export type chartsPartial = Partial<TooltipProps>
    & Partial<BarProps>
    & Partial<LineProps>
    & Partial<PieProps>

export const animationProps: chartsPartial = {
    isAnimationActive: true,
    animationDuration: 2500,
    animationEasing: 'ease-in-out',
    wrapperStyle: {
        transition: 'transform .3s ease-out',
        borderRadius: 'var(--border-radius-10)'
    },
}

export const tooltipProps: Partial<TooltipProps> = {
    contentStyle: {
        background: 'rgba(245,248,244,0.95)',
        border: '1px solid rgba(130,145,120,0.18)',
        borderRadius: '10px',
        fontSize: '12px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
    }
}

export const legendProps: Partial<LegendProps> = {
    iconType: "circle",
    iconSize: 12,
    wrapperStyle: { fontSize: 12 }
}

export const axisProps: Partial<XAxisProps> & Partial<YAxisProps> = {
    tick: {
        fontSize: 14,
        fill: 'var(--warm-gray-300)'
    },
    height: 45,
    dy: 10,
    axisLine: false,
    tickLine: false,
}

export const xAxisProps: Partial<XAxisProps> = {
    interval: 0,
}

export const yAxisProps: Partial<YAxisProps> = {
    width: 24,
}