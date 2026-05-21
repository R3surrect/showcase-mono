// #region Imports
import { Bar, BarChart, Legend, Rectangle, Tooltip, XAxis, YAxis } from 'recharts';
import type { DashboardStatBlockProps } from '@/components/ui/dashboards/DashboardStatBlock/DashboardStatBlock.types';
import Grid from '@/components/ui/Grid/Grid'
import DashboardStatBlock from '@/components/ui/dashboards/DashboardStatBlock/DashboardStatBlock';
import DashboardActivityBlock from '@/components/ui/dashboards/DashboardActivityBlock/DashboardActivityBlock';
import DashboardPieStatsBlock from '@/components/ui/dashboards/DashboardPieStatsBlock/DashboardPieStatsBlock';
import Stack from '@/components/ui/Stack/Stack';
import Heading from '@/components/ui/Heading/Heading';
import { animationProps, axisProps, legendProps, tooltipProps, xAxisProps, yAxisProps } from '@/components/ui/dashboards/config';
import {
    LucideAlertCircle,
    LucideAward,
    LucideBell,
    LucideCalendarCheck,
    LucideCheckCircle2,
    LucideFlame,
    LucideLayers,
    LucideStar,
    LucideTarget,
    LucideTrendingUp,
    LucideZap
} from 'lucide-react'
import Surface from '@/components/ui/Surface/Surface';
// #endregion
//#region Mock
const dashboardStatMock: DashboardStatBlockProps[] = [
    {
        id: '1',
        iconObj: {
            icon: LucideTarget,
            color: 'var(--neutral-250)',
        },
        label: 'Всего задач',
        value: '25',
        subtitle: '4 проекта · 6 заметок'
    },
    {
        id: '2',
        iconObj: {
            icon: LucideCheckCircle2,
            color: 'var(--warm-green-700)',
        },
        label: 'Выполнено',
        value: '44%',
        subtitle: '11 из 25 задач'
    },
    {
        id: '3',
        iconObj: {
            icon: LucideAlertCircle,
            color: 'var(--warm-red-400)',
        },
        label: 'Просрочено',
        value: '4',
        subtitle: '16% от всех задач'
    },
    {
        id: '4',
        iconObj: {
            icon: LucideZap,
            color: 'var(--cold-blue-grey-400)',
        },
        label: 'В работе сейчас',
        value: '4',
        subtitle: '6 в ожидании'
    },
    {
        id: '5',
        iconObj: {
            icon: LucideTrendingUp,
            color: 'var(--warm-green-700)',
        },
        label: 'Высокий приоритет — выполнено',
        value: '56%',
        subtitle: '5 из 9 срочных'
    },
    {
        id: '6',
        iconObj: {
            icon: LucideStar,
            color: 'var(--warm-orange-400)',
        },
        label: 'Избранных задач',
        value: '6',
        subtitle: 'отмечены как важные'
    },
    {
        id: '7',
        iconObj: {
            icon: LucideBell,
            color: 'var(--warm-green-700)',
        },
        label: 'С напоминанием',
        value: '7',
        subtitle: '28% всех задач'
    },
    {
        id: '8',
        iconObj: {
            icon: LucideLayers,
            color: 'var(--neutral-250)',
        },
        label: 'Задач на проект',
        value: '6',
        subtitle: 'в среднем'
    }
];
const insightsStatsMock: DashboardStatBlockProps[] = [
    {
        id: '40',
        iconObj: {
            icon: LucideFlame,
            color: 'var(--warm-red-400)',
        },
        label: 'Последние 7 дней',
        value: '6',
        valueLabel: 'задач выполнено',
        subtitle: 'Лучший день: 2 задач за сутки',

    },
    {
        id: '49',
        iconObj: {
            icon: LucideCalendarCheck,
            color: 'var(--neutral-400)',
        },
        label: 'Задачи с дедлайном',
        value: '25',
        valueLabel: 'из 25',
        subtitle: '100% задач имеют срок выполнения',

    },
    {
        id: '31',
        iconObj: {
            icon: LucideAward,
            color: 'var(--cold-blue-grey-400)',
        },
        label: 'Лидер по задачам',
        value: '📱 Мобильное приложение',
        subtitle: '9 задач · 44% выполнено',
    },
    {
        id: '25',
        iconObj: {
            icon: LucideTrendingUp,
            color: 'var(--cold-blue-grey-400)',
        },
        label: 'Самый продуктивный',
        value: '✨ Ребрендинг',
        subtitle: '50% задач завершены',
    },
]
const insightsStatsBottomMock: { label: string; value: number; subtitle: string }[] = [
    { label: 'Без проекта', value: 0, subtitle: '0%' },
    { label: 'Заметок', value: 6, subtitle: 'Всего создано' },
    { label: 'Среднее напоминание', value: 56, subtitle: 'минут' },
]
const taskPrioritiesBarMock = [
    {
        name: 'Высокий',
        'Всего': 9,
        'Выполнено': 5,
        colorTotal: 'color-mix(in srgb, var(--warm-red-400), transparent var(--opacity-medium))',
        colorDone: 'var(--warm-red-400)'
    },
    {
        name: 'Средний',
        'Всего': 10,
        'Выполнено': 4,
        colorTotal: 'color-mix(in srgb, var(--warm-orange-400), transparent var(--opacity-medium))',
        colorDone: 'var(--warm-orange-400)'
    },
    {
        name: 'Низкий',
        'Всего': 6,
        'Выполнено': 2,
        colorTotal: 'color-mix(in srgb, var(--warm-green-500), transparent var(--opacity-medium))',
        colorDone: 'var(--warm-green-500)'

    },
]
const taskLoadBarMock = [
    {
        name: '✨ Ребрендинг',
        'Всего': 6,
        'Выполнено': 3,
    },
    {
        name: '📱 Мобильное приложение',
        'Всего': 9,
        'Выполнено': 4,
    },
    {
        name: '📅 Контент-план',
        'Всего': 6,
        'Выполнено': 2,
    },
    {
        name: '🏢 Внутренний портал',
        'Всего': 6,
        'Выполнено': 2,
    },
]
// #endregion

const barStyles = {
    width: '100%',
    maxHeight: '180px',
    aspectRatio: 1.618,
    marginTop: '1rem',
    cursor: 'pointer'
};
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

export const Component = () => {
    return (
        <Stack>
            <Grid columns={4} alignItems='start' height='fit-content'>
                {
                    dashboardStatMock.map(item => (
                        <DashboardStatBlock {...item} isAnimated={true} key={item.id} />
                    ))
                }
            </Grid>
            <Grid columns={2} alignItems='start' height='fit-content'>
                <DashboardActivityBlock />
                <DashboardPieStatsBlock />
            </Grid>

            <Surface>
                <Heading
                    variant="secondary"
                    level={2}
                    subtitle="Сколько задач каждого приоритета выполнено : всего"
                >
                    Приоритет задач - выполнение
                </Heading>

                <BarChart
                    style={barStyles}
                    data={taskPrioritiesBarMock}
                    responsive
                >
                    <YAxis width='auto' {...axisProps} {...yAxisProps} />
                    <XAxis dataKey='name' {...axisProps} {...xAxisProps} />
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

            <Surface>
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
                    <XAxis dataKey='name' {...axisProps} {...xAxisProps} />
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

            <Surface>
                <Heading variant="secondary" level={2}>Инсайты продуктивности</Heading>
                <Stack gap='lg'>

                    <Grid columns={2}>
                        {insightsStatsMock.map(item => (
                            <DashboardStatBlock
                                isAnimated={true}
                                {...item}
                            />
                        ))}
                    </Grid>
                    <Stack direction='row' align='center' gap='lg'>
                        {/*//! Выделить в отдельный компонент */}
                        {
                            insightsStatsBottomMock.map(item => (
                                <DashboardStatBlock
                                    alignment='center'
                                    variant='minimal'
                                    justify='center'
                                    isAnimated={true}

                                    label={item.label}
                                    value={item.value}
                                    subtitle={item.subtitle}
                                />
                            ))}
                    </Stack>
                </Stack>
            </Surface>
        </Stack>
    )
}
