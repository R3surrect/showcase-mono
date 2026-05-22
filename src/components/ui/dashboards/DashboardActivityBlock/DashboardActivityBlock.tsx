import Surface from "@components/ui/Surface/Surface";
import Heading from "@components/ui/Heading/Heading";
import { Tooltip, ResponsiveContainer, Legend, Line, LineChart, XAxis, YAxis, type LineProps, CartesianGrid } from "recharts";
import { animationProps, axisProps, legendProps, tooltipProps, xAxisProps, yAxisProps } from "@components/ui/dashboards/dashboards.constants";

const chartsMock = [
    { day: '20 апр.', completed: 0, outdated: 0, all: 0 },
    { day: '21 апр.', completed: 0, outdated: 0, all: 0 },
    { day: '22 апр.', completed: 0, outdated: 0, all: 0 },
    { day: '23 апр.', completed: 0, outdated: 0, all: 0 },
    { day: '24 апр.', completed: 1, outdated: 0, all: 1 },
    { day: '25 апр.', completed: 1, outdated: 0, all: 1 },
    { day: '26 апр.', completed: 1, outdated: 0, all: 1 },
    { day: '27 апр.', completed: 2, outdated: 0, all: 2 },
    { day: '28 апр.', completed: 1, outdated: 1, all: 2 },
    { day: '29 апр', completed: 1, outdated: 1, all: 2 },
    { day: '30 апр', completed: 1, outdated: 1, all: 2 },
    { day: '1 мая', completed: 1, outdated: 1, all: 2 },
    { day: '2 мая', completed: 2, outdated: 0, all: 2 },
    { day: '3 мая', completed: 0, outdated: 0, all: 0 },
]

const lineProps: Partial<LineProps> = {
    strokeWidth: 3,
    animationEasing: 'ease-in-out',
    cursor: 'pointer',
}

const DashboardActivityBlock = () => {
    return <Surface>
        <Heading variant="secondary" level={2} subtitle="Количество задач по дате дедлайна">Активность за 2 недели</Heading>
        <div style={{
            width: '100%',
            height: '256px',
            marginTop: '1rem',
        }}>
            <ResponsiveContainer width="100%" height={256}>
                <LineChart responsive data={chartsMock}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(130,145,120,0.12)" />
                    <Line
                        dataKey="all"
                        name="Всего"
                        stroke="var(--cold-blue-grey-400)"
                        type="monotone"
                        dot={false}
                        {...animationProps}
                        {...lineProps}
                    />
                    <Line
                        dataKey="completed"
                        name="Выполнено"
                        stroke="var(--warm-green-500)"
                        type="monotone"
                        dot={{ r: 3, fill: 'var(--warm-green-500)' }}
                        {...animationProps}
                        {...lineProps}
                    />
                    <Line
                        dataKey="outdated"
                        name="Просрочено"
                        stroke="var(--warm-red-400)"
                        type="monotone"
                        dot={false}
                        strokeDasharray="4 3"
                        {...animationProps}
                        {...lineProps}
                    />
                    <XAxis
                        dataKey="day"
                        name="День"
                        {...axisProps}
                        {...xAxisProps}
                        interval={1}
                    />
                    <Tooltip
                        {...tooltipProps}
                        {...animationProps}
                    />
                    <Legend {...legendProps} />
                    <YAxis
                        {...axisProps}
                        {...yAxisProps}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    </Surface>
}

export default DashboardActivityBlock;