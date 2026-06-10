import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import Heading from "@components/ui/Heading/Heading";
import Surface from "@components/ui/Surface/Surface";
import Text from "@components/ui/Text/Text";
import Stack from "@components/ui/Stack/Stack";
import { statusMock } from "@/components/entities/ui/dashboards/DashboardPieStatsBlock/DashboardPieStatsBlock.constants";
import { animationProps, tooltipProps } from "@/components/entities/ui/dashboards/dashboards.constants";
import type { StatusPieMock } from "@/components/entities/ui/dashboards/DashboardPieStatsBlock/DashboardPieStatsBlock.types";

const DashboardPieStatsBlock = () => {
    return <Surface>
        <Stack gap="sm">
            <Heading variant="secondary" level={2}>По статусам</Heading>
            <Text size={7}>Распределение всех задач</Text>
        </Stack>

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
                    {...animationProps}
                    data={statusMock}
                    cx="40%"
                    cy="45%"
                    innerRadius={52}
                    outerRadius={82}
                    paddingAngle={4}
                    dataKey="value"
                />
                <Tooltip {...tooltipProps} {...animationProps} />
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
                    }}
                />
            </PieChart>
        </ResponsiveContainer>
    </Surface>
}

export default DashboardPieStatsBlock;