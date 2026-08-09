import Button from "@/components/entities/Button/Button"
import { ContentHeader } from "@/components/entities/ContentHeader/ContentHeader"
import Stack from "@/components/entities/Stack/Stack"
import Tag from "@/components/entities/Tag/Tag"
import Text from "@/components/entities/Text/Text"

import { LucideAlertTriangle, LucideBell, LucideCalendarRange, LucideCheckCircle, LucidePlusCircle } from "lucide-react"

const MOCK_STAT_TAGS = [
    {
        id: "stat-today",
        label: "Сегодня: 0/1",
        icon: LucideCheckCircle,
        color: { h: 42, s: 18, l: 30 },
    },
    {
        id: "stat-active-month",
        label: "13 активных на месяц",
        icon: LucideCalendarRange,
        color: { h: 42, s: 18, l: 30 },
    },
    {
        id: "stat-notifications",
        label: "4 уведомлений по задачам",
        icon: LucideBell,
        color: { h: 36, s: 35, l: 38 },
    },
    {
        id: "stat-overdue",
        label: "4 просроченных дедлайна",
        icon: LucideAlertTriangle,
        color: { h: 12, s: 35, l: 40 },
    },
] as const;

export const Component = () => {
    return (
        <Stack gap="md">
            <Stack direction="row" gap="sm">
                {
                    MOCK_STAT_TAGS.map((tag) => {
                        const IconComponent = tag.icon;
                        return (
                            <Tag
                                key={tag.id}
                                color={tag.color}
                                type={'default'}
                                data-system
                            >
                                <IconComponent size={12} strokeWidth={3} />
                                <Text weight="bold" color="var(--neutral-0)">{tag.label}</Text>
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
        </Stack>
    )
}
