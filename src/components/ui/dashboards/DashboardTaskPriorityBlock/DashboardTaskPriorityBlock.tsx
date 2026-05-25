import { Bar, BarChart, Legend, Rectangle, Tooltip, XAxis, YAxis } from "recharts";
import Heading from "../../Heading/Heading";
import Surface from "../../Surface/Surface";
import { barStyles } from "../dashboards.constants";
import { animationProps, axisProps, legendProps, tooltipProps, yAxisProps } from "../dashboards.constants";
import Text from "../../Text/Text";
import Stack from "../../Stack/Stack";

const taskPrioritiesBarMock = [
    {
        id: 'priority-high',
        name: 'Высокий',
        'Всего': 9,
        'Выполнено': 5,
        colorTotal: 'color-mix(in srgb, var(--warm-red-400), transparent var(--opacity-medium))',
        colorDone: 'var(--warm-red-400)'
    },
    {
        id: 'priority-medium',
        name: 'Средний',
        'Всего': 10,
        'Выполнено': 4,
        colorTotal: 'color-mix(in srgb, var(--warm-orange-400), transparent var(--opacity-medium))',
        colorDone: 'var(--warm-orange-400)'
    },
    {
        id: 'priority-low',
        name: 'Низкий',
        'Всего': 6,
        'Выполнено': 2,
        colorTotal: 'color-mix(in srgb, var(--warm-green-500), transparent var(--opacity-medium))',
        colorDone: 'var(--warm-green-500)'
    },
]

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
            <YAxis width='auto' {...axisProps} {...yAxisProps} />
            <XAxis dataKey='name' {...axisProps} />
            <Tooltip {...tooltipProps} {...animationProps} />
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
        </BarChart>
    </Surface>
}

export default DashboardTaskPriorityBlock;