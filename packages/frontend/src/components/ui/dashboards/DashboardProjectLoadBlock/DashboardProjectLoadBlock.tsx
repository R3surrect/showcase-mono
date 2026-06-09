import { Bar, BarChart, Legend, Rectangle, Tooltip, XAxis, YAxis } from "recharts";
import Heading from "@components/ui/Heading/Heading";
import Surface from "@components/ui/Surface/Surface";
import Text from "@components/ui/Text/Text";
import Stack from "@components/ui/Stack/Stack";
import { taskLoadBarMock } from "@/components/entities/ui/dashboards/DashboardProjectLoadBlock/DashboardProjectLoadBlock.constants";
import {
    animationProps,
    axisProps,
    barStyles,
    legendProps,
    tooltipProps,
    yAxisProps
} from "@components/entities/ui/dashboards/dashboards.constants";

const DashboardProjectLoadBlock = () => {
    return <Surface>
        <Stack gap="sm">
            <Heading variant="secondary" level={2}>
                Нагрузка по проектам
            </Heading>
            <Text size={7}>Число задач и процент выполнения в каждом проекте</Text>
        </Stack>

        <BarChart
            style={barStyles}
            data={taskLoadBarMock}
            responsive
        >
            <YAxis width='auto' {...axisProps} {...yAxisProps} />
            <XAxis dataKey='name' {...axisProps} />
            <Tooltip {...tooltipProps} />
            <Legend {...legendProps} />
            <Bar
                dataKey='Всего'
                fill='color-mix(in srgb, var(--warm-green-500), transparent var(--opacity-medium))'
                shape={(props) => {
                    return <Rectangle
                        {...props}
                        radius={[5, 5, 0, 0]}
                    />
                }}
                {...animationProps}
            />
            <Bar
                dataKey='Выполнено'
                fill='var(--warm-green-500)'
                shape={(props) => {
                    return <Rectangle
                        {...props}
                        radius={[5, 5, 0, 0]}
                    />
                }}
                {...animationProps}
            />
        </BarChart>
    </Surface>
}

export default DashboardProjectLoadBlock;