import { Tooltip, ResponsiveContainer, Legend, Line, LineChart, XAxis, YAxis, CartesianGrid } from "recharts";
import Surface from "@components/ui/Surface/Surface";
import Heading from "@components/ui/Heading/Heading";
import Text from "@components/ui/Text/Text";
import Stack from "@components/ui/Stack/Stack";
import { useDevice } from "@/hooks/useDevice";
import { chartsData, chartsMock } from "@/components/entities/ui/dashboards/DashboardActivityBlock/DashboardActivityBlock.constants";
import { animationProps, axisProps, legendProps, tooltipProps, yAxisProps } from "@/components/entities/ui/dashboards/dashboards.constants";
import { lineProps } from "@/components/entities/ui/dashboards/DashboardActivityBlock/DashboardActivityBlock.types";

const DashboardActivityBlock = () => {
    const isTablet = useDevice('tablet');

    return <Surface>
        <Stack gap="sm">
            <Heading variant="secondary" level={2}>Активность за 2 недели</Heading>
            <Text size={7}>Количество задач по дате дедлайна</Text>
        </Stack>
        <ResponsiveContainer
            width="100%"
            height={256}
            style={{ marginTop: '1rem' }}
        >
            <LineChart responsive data={chartsMock}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(130,145,120,0.12)" />
                {
                    chartsData.map(item => (
                        <Line
                            {...item}
                            type="monotone"
                            dot={false}
                            {...animationProps}
                            {...lineProps}
                        />
                    ))
                }
                <XAxis
                    dataKey="day"
                    name="День"
                    interval={isTablet ? 2 : 1}
                    {...axisProps}
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
    </Surface>
}

export default DashboardActivityBlock;