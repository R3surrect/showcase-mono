import Stack from "../Stack/Stack"
import { LucideStickyNote } from "lucide-react"
import Text from "../Text/Text"
import SegmentedPicker from "../SegmentedPicker/SegmentedPicker"
import Tag from "../Tag/Tag"
import Surface from "../Surface/Surface"
import { colord } from "colord"
import type { NoteCardProps } from "./NoteCard.types"

const NoteCard = (props: NoteCardProps) => {
    const { hasSurface = true } = props;

    const Component = <Stack direction='column'>
        <Stack direction='row' justify='space-between'>
            <Stack direction='row' gap='sm' align='center'>
                <LucideStickyNote size="32" color="var(--warm-green-500)" />
                <Text size={5} color="var(--warm-green-700)" weight='bolder'>{props.title}</Text>
            </Stack>
            {props.toolbar}
        </Stack>

        <Text color='var(--neutral-850)' weight='bold' truncate wrap truncateAfter={5}>
            {props.details}
        </Text>
        <Stack gap='sm'>
            <SegmentedPicker label='Task' justify='start'>
                <Stack direction="row" gap="sm"><Text width='fit-content' weight='bold' color='white'>{props.taskLabel}</Text></Stack>
            </SegmentedPicker>
            <SegmentedPicker label='Project' justify='start'>
                <Tag color={colord(props.projectColor).desaturate(0.3).darken(0.3).toHsl()} type='priority' width='fit' innerJustify='start'>
                    <Text width='fit-content' weight='bold' color='white'>{props.projectLabel}</Text>
                </Tag>
            </SegmentedPicker>
        </Stack>
    </Stack>;

    return hasSurface
        ? <Surface data-interactive>{Component}</Surface>
        : Component
}

export default NoteCard;