import DashboardSurface from "../DashboardSurface/DashboardSurface";
import Heading from "../Heading/Heading";
import { Tooltip, ResponsiveContainer, Legend, Line, LineChart, XAxis, YAxis, type LineProps, CartesianGrid } from "recharts";

const chartsMock = [
    { day: '20 апр.', completed: 0, outdated: 0, all: 0 },
    { day: ' ', completed: 0, outdated: 0, all: 0 },

    { day: '22 апр.', completed: 0, outdated: 0, all: 0 },
    { day: ' ', completed: 0, outdated: 0, all: 0 },

    { day: '24 апр.', completed: 1, outdated: 0, all: 1 },
    { day: ' ', completed: 1, outdated: 0, all: 1 },

    { day: '26 апр.', completed: 1, outdated: 0, all: 1 },
    { day: ' ', completed: 2, outdated: 0, all: 2 },

    { day: '28 апр.', completed: 1, outdated: 1, all: 2 },
    { day: ' ', completed: 1, outdated: 1, all: 2 },

    { day: '30 апр', completed: 1, outdated: 1, all: 2 },
    { day: ' ', completed: 1, outdated: 1, all: 2 },

    { day: '2 мая', completed: 2, outdated: 0, all: 2 },
    { day: ' ', completed: 0, outdated: 0, all: 0 },
]

const lineProps: Partial<LineProps> = {
    strokeWidth: 3,
    isAnimationActive: true,
    animationDuration: 2000,
    animationEasing: 'ease-in-out',
    cursor: 'pointer',
}

const tooltipStyle = {
    background: 'rgba(245,248,244,0.95)',
    border: '1px solid rgba(130,145,120,0.18)',
    borderRadius: '10px',
    fontSize: '12px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
};

const DashboardActivityBlock = () => {
    return <DashboardSurface>
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
                        {...lineProps}
                        dot={false}
                    />
                    <Line
                        dataKey="completed"
                        name="Выполнено"
                        stroke="var(--warm-green-500)"
                        type="monotone"
                        dot={{ r: 3, fill: 'var(--warm-green-500)' }}
                        {...lineProps}
                    />
                    <Line
                        dataKey="outdated"
                        name="Просрочено"
                        stroke="var(--warm-red-400)"
                        type="monotone"
                        dot={false}
                        strokeDasharray="4 3"
                        {...lineProps}
                    />
                    <XAxis
                        dataKey="day"
                        name="День"
                        tick={{ fontSize: 11, fill: '#8a8070' }}
                        axisLine={false}
                        tickLine={false}
                        interval={1}
                    />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend
                        iconType="circle"
                        iconSize={8}
                        wrapperStyle={{ fontSize: 12 }}
                    />
                    <YAxis tick={{ fontSize: 11, fill: '#8a8070' }} axisLine={false} tickLine={false} width={24} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    </DashboardSurface>
}

export default DashboardActivityBlock;