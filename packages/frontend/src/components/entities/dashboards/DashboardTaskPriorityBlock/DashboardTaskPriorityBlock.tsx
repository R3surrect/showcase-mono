import { Bar, BarChart, Legend, Rectangle, Tooltip, XAxis, YAxis } from "recharts";
import Heading from "@components/ui/Heading/Heading";
import Surface from "@components/ui/Surface/Surface";
import Text from "@components/ui/Text/Text";
import Stack from "@components/ui/Stack/Stack";
import { animationProps, axisProps, barStyles, legendProps, tooltipProps, yAxisProps } from "@/components/entities/ui/dashboards/dashboards.constants";
import { taskPrioritiesBarMock } from "@/components/entities/ui/dashboards/DashboardTaskPriorityBlock/DashboardTaskPriorityBlock.constants";

const LegendRender = (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', fontSize: '12px' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ccc' }} />
            Всего
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#666' }} />
            Выполнено
        </span>
    </div>
);

const DashboardTaskPriorityBlock = () => {
    return <Surface>
        <Stack gap="sm">
            <Heading
                variant="secondary"
                level={2}
            >
                Приоритет задач - выполнение
            </Heading>
            <Text size={7}>Сколько задач каждого приоритета выполнено : всего</Text>
        </Stack>


        <BarChart
            style={barStyles}
            data={taskPrioritiesBarMock}
            responsive
        >
            <Legend
                {...legendProps}
                content={() => {
                    return LegendRender;
                }}
            />
            <Bar
                dataKey='Всего'
                shape={(props) => {
                    const { payload } = props;
                    return <Rectangle
                        fill={payload.colorTotal}
                        radius={[5, 5, 0, 0]}
                        {...props}
                    />
                }}
                {...animationProps}
            />
            <Bar
                dataKey='Выполнено'
                shape={(props) => {
                    const { payload } = props;
                    return <Rectangle
                        fill={payload.colorDone}
                        radius={[5, 5, 0, 0]}
                        {...props}
                    />
                }}
                {...animationProps}
            />
            <YAxis width='auto' {...axisProps} {...yAxisProps} />
            <XAxis dataKey='name' {...axisProps} />
            <Tooltip {...tooltipProps} {...animationProps} />
        </BarChart>
    </Surface>
}

export default DashboardTaskPriorityBlock;