import Grid from '@/components/ui/Grid/Grid'
import type { DashboardStatBlockProps } from '@/components/ui/DashboardStatBlock/DashboardStatBlock'
import { LucideAlertCircle, LucideBell, LucideCheckCircle2, LucideLayers, LucideStar, LucideTarget, LucideTrendingUp, LucideZap } from 'lucide-react'
import DashboardStatBlock from '@/components/ui/DashboardStatBlock/DashboardStatBlock'
import DashboardActivityBlock from '@/components/ui/DashboardActivityBlock/DashboardActivityBlock';
import DashboardPieStatsBlock from '@/components/ui/DashboardPieStatsBlock/DashboardPieStatsBlock';
import Stack from '@/components/ui/Stack/Stack';
// import { useEffect, useState } from 'react';

const mockData: DashboardStatBlockProps[] = [
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

export const Component = () => {
    // const [isMounted, setIsMounted] = useState(false);

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setIsMounted(true)
    //     }, 300);
    //     return () => clearTimeout(timer);
    // }, [])

    return (
        <Stack>
            <Grid columns={4} alignItems='start' height='fit-content'>
                {
                    mockData.map(item => (
                        < DashboardStatBlock {...item} key={item.id} />
                    ))
                }
            </Grid>
            <Grid columns={2} alignItems='start' height='fit-content'>
                {/* {isMounted ? <> */}
                <DashboardActivityBlock />
                <DashboardPieStatsBlock />
                {/* </> */}
                {/* : <div>...loading</div> */}
                {/* } */}
            </Grid>
            <Grid columns={1}>
                
            </Grid>
        </Stack>)



}
