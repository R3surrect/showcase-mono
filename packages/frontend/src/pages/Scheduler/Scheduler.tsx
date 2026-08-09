import Banner from "@/components/entities/Banner/Banner"
import Button from "@/components/entities/Button/Button"
import Calendar from "@/components/entities/Calendar/Calendar"
import { getHslString } from "@/components/entities/ColorList/ColorList.constants"
import { ContentHeader } from "@/components/entities/ContentHeader/ContentHeader"
import Grid from "@/components/entities/Grid/Grid"
import Stack from "@/components/entities/Stack/Stack"
import Surface from "@/components/entities/Surface/Surface"
import Tag from "@/components/entities/Tag/Tag"
import Text from "@/components/entities/Text/Text"
import { useHintStore } from "@/store/useHintStore"

import { LucideAlertTriangle, LucideBell, LucideCalendarRange, LucideCheckCircle, LucidePlay, LucidePlusCircle } from "lucide-react"
import { useState } from "react"

const MOCK_STAT_TAGS = [
    {
        id: "stat-today",
        label: "Сегодня: 0/1",
        icon: LucideCheckCircle,
        color: { h: 42, s: 18, l: 60 },
    },
    {
        id: "stat-active-month",
        label: "13 активных на месяц",
        icon: LucideCalendarRange,
        color: { h: 42, s: 18, l: 60 },
    },
    {
        id: "stat-notifications",
        label: "4 уведомлений по задачам",
        icon: LucideBell,
        color: { h: 36, s: 35, l: 68 },
    },
    {
        id: "stat-overdue",
        label: "4 просроченных дедлайна",
        icon: LucideAlertTriangle,
        color: { h: 12, s: 35, l: 70 },
    },
] as const;

const MOCK_TASK_TAGS = [
    {
        id: 21,
        label: "🖥️ Backend",
        color: { h: 210, s: 20, l: 15 },
    },
    {
        id: 10,
        label: "⚡ API",
        color: { h: 38, s: 35, l: 18 },
    },
    {
        id: 4,
        label: "🧪 Тесты",
        color: { h: 145, s: 25, l: 12 },
    },
    {
        id: 1,
        label: "🔥 Срочно",
        color: { h: 12, s: 35, l: 10 },
    },
] as const;

const hintId = 'scheduler-page-hint';

export const Component = () => {

    const TaskCard = <Surface>
        <Stack gap="sm">
            <Stack direction="row" justify="space-between" align="center">
                <Text weight="bolder" color="var(--neutral-850)" size={4}>
                    Написать unit-тесты для API
                </Text>
                <Stack direction="row" gap="sm" align="center">
                    <Tag
                        id={0}
                        color={{ h: 60, s: 8, l: 42 }}
                        type="task_status"
                    >
                        <Stack
                            direction="row"
                            align="center"
                            gap="sm"
                            justify='space-between'
                            wrap={false}
                        >
                            <LucidePlay
                                color={getHslString({ h: 60, s: 8, l: 32 })}
                                size={16}
                            />
                            <Text
                                color={getHslString({ h: 60, s: 8, l: 32 })}
                                size={6}
                            >
                                В работе
                            </Text>
                        </Stack>
                    </Tag>
                    <Text
                        color={getHslString({ h: 60, s: 8, l: 42 })}
                        size={6}
                        weight="regular"
                    >
                        05 Aug 26 | 14:00
                    </Text>
                </Stack>
            </Stack>
            <Stack direction="column" gap="md">
                <Text color="var(--neutral-750)" size={5} weight="bold">Покрыть эндпоинты /auth и /tasks</Text>
                <Stack direction="row">
                    {MOCK_TASK_TAGS.map((tag) => (
                        <Tag key={tag.id} id={tag.id} color={tag.color} type="default">
                            <Text size={6} weight="bold" color={getHslString(tag.color)}>
                                {tag.label}
                            </Text>
                        </Tag>
                    ))}
                </Stack>
            </Stack>
        </Stack>
    </Surface>

    const dismiss = useHintStore(store => store.dismissHint);
    const isDismissed = useHintStore(store => store.data[hintId])
    const [selectedDate, setSelectedDate] = useState<Date>();

    return (
        <Stack gap="md">
            {
                !isDismissed &&
                <Banner variant="hint" isClosable onClose={() => dismiss(hintId)} color='var(--warm-green-500)'>
                    <Text color='var(--warm-green-500)' weight='bolder' size={6}>Быстрый доступ к расписанию:</Text>
                    <Text color='var(--warm-green-500)' size={6} weight='bold'>Клик по дате справа или тегам сверху сразу отфильтрует вашу ленту задач.</Text>
                </Banner>
            }
            <Stack direction="row" gap="sm" align="center">
                {
                    MOCK_STAT_TAGS.map((tag) => {
                        const IconComponent = tag.icon;
                        return (
                            <Tag
                                key={tag.id}
                                color={tag.color}
                                type={'default'}
                            >
                                <IconComponent size={16} strokeWidth={3} />
                                <Text weight="bold" color="var(--neutral-750)">{tag.label}</Text>
                            </Tag>
                        );
                    })}
            </Stack>
            <ContentHeader
                title="Планировщик"
                subElement={<Text color="var(--warm-green-500)">Все задачи</Text>}
            >
                <Button size="sm" onClick={() => console.log('create task handler')}>
                    <Stack align="center" direction="row" gap="md">
                        <LucidePlusCircle />
                        Create Task
                    </Stack>
                </Button>
            </ContentHeader>
            <Grid templateColumns="3fr 1fr">
                <Stack gap="md" direction="column">
                    {TaskCard}
                    {TaskCard}
                    {TaskCard}
                    {TaskCard}
                    {TaskCard}
                    {TaskCard}
                    {TaskCard}
                    {TaskCard}
                    {TaskCard}
                    {TaskCard}
                </Stack>
                <Calendar
                    mode="single"
                    onSelect={setSelectedDate}
                    selected={selectedDate}
                />
            </Grid>
        </Stack>
    )
}
