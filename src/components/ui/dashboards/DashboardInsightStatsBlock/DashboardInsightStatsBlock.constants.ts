import {
    LucideAward,
    LucideCalendarCheck,
    LucideFlame,
    LucideTrendingUp,
} from 'lucide-react'
import type { DashboardStatBlockFullProps } from '../DashboardStatBlockFull/DashboardStatBlockFull.types'
import type { DashboardStatBlockMinimalProps } from '../DashboardStatBlockMinimal/DashboardStatBlockMinimal.types'

export const insightsStatsMock: DashboardStatBlockFullProps[] = [
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
export const insightsStatsBottomMock: DashboardStatBlockMinimalProps[] = [
    { id: 'stat-no-project', title: 'Без проекта', value: '0', subtitle: '0%' },
    { id: 'stat-total-notes', title: 'Заметок', value: '6', subtitle: 'Всего создано' },
    { id: 'stat-avg-reminder', title: 'Среднее напоминание', value: '56', subtitle: 'минут' },
]