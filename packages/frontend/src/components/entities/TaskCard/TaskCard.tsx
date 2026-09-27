import { colord } from "colord"
import dayjs from "dayjs"
import Stack from "../Stack/Stack"
import Surface from "../Surface/Surface"
import Tag from "../Tag/Tag"
import Text from "../Text/Text"
import type { TaskCardProps } from "./TaskCard.types"
import { useGetTagByIdQuery } from "@/queries/tags/tags.query"
import { DEFAULT_HSL_COLOR } from "../_shared/system.constants"
import SegmentedPicker from "../SegmentedPicker/SegmentedPicker"
import Button from "../Button/Button"
import { LucideArchive, LucideXCircle } from "lucide-react"

const TaskCard = (props: TaskCardProps) => {
    const { hasSurface = true } = props;
    const { data: statusTag } = useGetTagByIdQuery(props.statusTagId);
    const { data: priorityTag } = useGetTagByIdQuery(props.priorityTagId);

    const Component = <Stack gap="none" width="max">
        <Stack direction="row" justify="space-between" align="center">
            <Text weight="bolder" color="var(--neutral-850)" size={4}>
                {props.label}
            </Text>
            <Stack direction="row" gap="sm" align="center">
                {statusTag &&
                    <Tag
                        data-interactive
                        {...statusTag}
                        type="default"
                        // isSystem={statusTag.category.toLowerCase().trim() === 'system'}
                        variant='default'
                        width="130px"
                    >
                        <Text
                            color={colord({ ...statusTag.color, l: 40 }).toHslString()}
                            as="span"
                            title={statusTag.label}
                            size={6}
                            weight="bold"
                        >
                            {statusTag.label}
                        </Text>
                    </Tag>
                }
                {
                    priorityTag &&
                    <Tag
                        data-interactive
                        {...priorityTag}
                        // type="default"
                        isSystem={priorityTag.category.toLowerCase().trim() === 'system'}
                        // variant='default'
                        width="130px"
                    >
                        <Text
                            color={colord({ ...priorityTag.color, l: 95 }).toHslString()}
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
                <Button variant="transparent" size="none">
                    <LucideArchive color="var(--warm-orange-400)" size={18} onClick={() => console.log(`archive ${props.id}`)}/>
                </Button>
                <Button variant="transparent" size="none">
                    <LucideXCircle color="var(--warm-red-400)" size={18} onClick={() => console.log(`delete ${props.id}`)}/>
                </Button>
            </Stack>
        </Stack>
        <Stack
            direction="column"
            gap="md"
        >
            <Text
                color="var(--neutral-750)"
                size={6}
                weight="bold"
            >
                {props.details}
            </Text>
            <Stack direction="row" gap="sm">
                {
                    props.tags.length > 0 && <SegmentedPicker>
                        {
                            props.tags.map((tag) => (
                                <Tag
                                    isEditable
                                    onDeleteAction={() => console.log('delete')}
                                    onEditAction={() => console.log('delete')}
                                    key={tag.id}
                                    id={tag.id}
                                    color={colord({ ...tag.color, l: 40 }).toHsl()}
                                    type="default"
                                >
                                    <Text size={6} weight="bold" color={colord({ ...tag.color, l: 40 }).toHslString()}>
                                        {tag.label}
                                    </Text>
                                </Tag>
                            ))
                        }
                    </SegmentedPicker>
                }
            </Stack>
        </Stack>
    </Stack>

    return (
        hasSurface
            ? <Surface isAnimated data-interactive > {Component} </Surface >
            : Component
    )
}

export default TaskCard;