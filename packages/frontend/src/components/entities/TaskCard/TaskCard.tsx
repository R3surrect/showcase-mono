import Stack from "../Stack/Stack"
import Surface from "../Surface/Surface"
import Tag from "../Tag/Tag"
import Text from "../Text/Text"
import { colord } from "colord"
import type { TaskCardProps } from "./TaskCard.types"
import dayjs from "dayjs"
import { useGetTagByIdQuery } from "@/queries/tags/tags.query"
import { DEFAULT_HSL_COLOR } from "../_shared/system.constants"

const TaskCard = (props: TaskCardProps) => {
    const { hasSurface = true } = props;
    const { data: statusTag } = useGetTagByIdQuery(props.statusTagId);
    const { data: priorityTag } = useGetTagByIdQuery(props.priorityTagId);

    const Component = <Stack gap="sm" width="max">
        <Stack direction="row" justify="space-between" align="center">
            <Text weight="bolder" color="var(--neutral-850)" size={4}>
                {props.label}
            </Text>
            <Stack direction="row" gap="sm" align="center">
                {statusTag &&
                    <Tag
                        {...statusTag}
                        type="default"
                        // isSystem={statusTag.category.toLowerCase().trim() === 'system'}
                        variant='default'
                        width="130px"
                    >
                        <Text
                            color={colord(statusTag.color).darken(0.2).toHslString()}
                            as="span"
                            title={statusTag.label}
                            size={6}
                            weight="bold"
                        >
                            {statusTag.label}
                        </Text>
                    </Tag>
                }
                {priorityTag &&
                    <Tag
                        {...priorityTag}
                        // type="default"
                        isSystem={priorityTag.category.toLowerCase().trim() === 'system'}
                        // variant='default'
                        width="130px"
                    >
                        <Text
                            color={colord(priorityTag.color).lighten(0.5).toHslString()}
                            as="span"
                            title={priorityTag.label}
                            size={6}
                            weight="bold"
                        >
                            {priorityTag.label}
                        </Text>
                    </Tag>
                }
                {
                    props.deadline && <Text
                        color={colord(DEFAULT_HSL_COLOR.color).toHslString()}
                        size={6}
                        weight="bold"
                    >
                        {dayjs(props.deadline).locale('ru').format('DD MMM YYYY | HH:MM')}
                    </Text>
                }
            </Stack>
        </Stack>
        <Stack direction="column" gap="md">
            <Text color="var(--neutral-750)" size={5} weight="bold">{props.details}</Text>
            <Stack direction="row" gap="sm">

                {/* {
                    rest.tags.map((tag) => (
                        <Tag key={tag.id} id={tag.id} color={tag.color} type="default">
                            <Text size={6} weight="bold" color={colord(tag.color).lighten(0.25).toHslString()}>
                                {tag.label}
                            </Text>
                        </Tag>
                    ))
                } */}
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