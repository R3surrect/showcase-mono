import { LucidePlay } from "lucide-react"
import Stack from "../Stack/Stack"
import Surface from "../Surface/Surface"
import Tag from "../Tag/Tag"
import Text from "../Text/Text"
import { colord } from "colord"
import type { TaskCardProps } from "./TaskCard.types"

const TaskCard = (props: TaskCardProps) => {
    const { hasSurface = true, ...rest } = props;

    const Component = <Stack gap="sm" width="max">
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
                        <LucidePlay color={colord({ h: 60, s: 8, l: 32 }).toHslString()} size={16} />
                        <Text color={colord({ h: 60, s: 8, l: 32 }).toHslString()} size={6}>
                            В работе
                        </Text>
                    </Stack>
                </Tag>
                <Text
                    color={colord({ h: 60, s: 8, l: 42 }).toHslString()}
                    size={6}
                    weight="regular"
                >
                    {rest.deadline.toLocaleString('ru-RU')}
                </Text>
            </Stack>
        </Stack>
        <Stack direction="column" gap="md">
            <Text color="var(--neutral-750)" size={5} weight="bold">Покрыть эндпоинты /auth и /tasks</Text>
            <Stack direction="row" gap="sm">
                {
                    rest.tags.map((tag) => (
                        <Tag key={tag.id} id={tag.id} color={tag.color} type="default">
                            <Text size={6} weight="bold" color={colord(tag.color).lighten(0.25).toHslString()}>
                                {tag.label}
                            </Text>
                        </Tag>
                    ))
                }
            </Stack>
        </Stack>
    </Stack>

    return (
        hasSurface
            ? <Surface> {Component} </Surface >
            : Component
    )
}

export default TaskCard;