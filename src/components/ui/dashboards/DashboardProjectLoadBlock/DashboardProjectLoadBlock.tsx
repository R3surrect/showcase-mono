import { Bar, BarChart, Legend, Rectangle, Tooltip, XAxis, YAxis } from "recharts";
import Heading from "../../Heading/Heading";
import Surface from "../../Surface/Surface";
import {
    animationProps,
    axisProps,
    barStyles,
    legendProps,
    tooltipProps,
    yAxisProps
} from "../dashboards.constants";

const taskLoadBarMock = [
    {
        id: 'load-rebranding',
        name: '✨ Ребрендинг',
        'Всего': 6,
        'Выполнено': 3,
    },
    {
        id: 'load-mobile',
        name: '📱 Мобильное приложение',
        'Всего': 9,
        'Выполнено': 4,
    },
    {
        id: 'load-content',
        name: '📅 Контент-план',
        'Всего': 6,
        'Выполнено': 2,
    },
    {
        id: 'load-portal',
        name: '🏢 Внутренний портал',
        'Всего': 6,
        'Выполнено': 2,
    },
]

const DashboardProjectLoadBlock = () => {
    return <Surface>
        <Heading
            variant="secondary"
            level={2}
            subtitle="Число задач и процент выполнения в каждом проекте"
        >
            Нагрузка по проектам
        </Heading>

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