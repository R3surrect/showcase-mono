import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import Heading from "../Heading/Heading";
import DashboardSurface from "../DashboardSurface/DashboardSurface";

const tooltipStyle = {
    background: 'rgba(245,248,244,0.95)',
    border: '1px solid rgba(130,145,120,0.18)',
    borderRadius: '10px',
    fontSize: '12px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
};

export interface StatusPieMock {
    name: string;
    value: number;
    fill: string;
    subValue: string;
}

const statusMock: StatusPieMock[] = [
    { name: 'Ожидание', value: 6, fill: 'var(--neutral-400)', subValue: '4 задач · 16%' },
    { name: 'В работе', value: 4, fill: 'var(--cold-blue-grey-400)', subValue: '6 задач · 24%' },
    { name: 'Выполнено', value: 11, fill: 'var(--warm-green-600)', subValue: '4 задач · 16%' },
    { name: 'Просрочено', value: 4, fill: 'var(--warm-red-400)', subValue: '11 задач · 44%' },
]

const DashboardPieStatsBlock = () => {
    return <DashboardSurface>
        <Heading variant="secondary" level={2} subtitle="Распределение всех задач">По статусам</Heading>

        <ResponsiveContainer width="55%" height={256} style={{ marginTop: '1rem' }}>
            <PieChart data={statusMock} margin={{ right: -150, top: 10 }}>
                <Pie
                    activeShape={{
                        stroke: 'var(--neutral-400)',
                        strokeWidth: 3,
                        fillOpacity: .65,
                        fill: 'var(--neutral-350)',
                        cursor: 'pointer'
                    }}

                    animationDuration={1500}
                    animationEasing="ease-in-out"
                    isAnimationActive={true}
                    data={statusMock}
                    cx="40%"
                    cy="45%"
                    innerRadius={52}
                    outerRadius={82}
                    paddingAngle={4}
                    dataKey="value"
                />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend
                    align="right"
                    layout="vertical"
                    verticalAlign="middle"
                    iconType='circle'
                    iconSize={12}
                    wrapperStyle={{ fontSize: '1rem' }}
                    formatter={(value, entry) => {
                        const { subValue } = entry.payload as StatusPieMock;
                        return (
                            <div
                                style={{
                                    display: 'inline-block',
                                    verticalAlign: 'top',
                                    paddingBottom: '1rem',
                                    paddingLeft: '0.5rem',
                                }}
                            >
                                <p
                                    style={{
                                        display: 'inline-block',
                                        fontSize: 'var(--footer-text-size)',
                                        fontWeight: 600,
                                        color: 'var(--neutral-850)',
                                        paddingBottom: '5px',
                                    }}
                                >
                                    {value}
                                </p>
                                <span
                                    style={{
                                        display: 'block',
                                        fontSize: 'var(--footer-text-size)',
                                        color: 'var(--warm-green-600)',
                                        fontWeight: 700,
                                        textAlign: 'left'
                                    }}
                                >
                                    {subValue}
                                </span>
                            </div>
                        )
                    }
                    }
                />
            </PieChart>
        </ResponsiveContainer>
    </DashboardSurface>
}

export default DashboardPieStatsBlock;