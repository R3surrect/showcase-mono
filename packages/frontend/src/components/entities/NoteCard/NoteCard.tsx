import { LucideFileText } from "lucide-react"
import Stack from "../Stack/Stack"
import Text from "../Text/Text"
import SegmentedPicker from "../SegmentedPicker/SegmentedPicker"
import Surface from "../Surface/Surface"
import type { NoteCardProps } from "./NoteCard.types"
import Tag from "../Tag/Tag"
import { colord } from "colord"

const NoteCard = (props: NoteCardProps) => {
    const { hasSurface = true } = props;

    const Component = <Stack direction='column'>
        <Stack direction='row' justify='space-between'>
            <Stack direction='row' gap='sm' align='center'>
                <LucideFileText size="24" color="var(--warm-green-500)" style={{ flexShrink: 0 }}/>
                <Text size={5} color="var(--warm-green-700)" weight='bolder'>{props.title}</Text>
            </Stack>
            {props.toolbar}
        </Stack>
        <Text color='var(--neutral-850)' weight='bold' truncate wrap truncateAfter={5}>
            {props.details}
        </Text>
        <Stack gap='sm'>
            {
                props.task &&
                <SegmentedPicker label='Task:' justify='space-between'>
                    <Text width='fit-content' weight='bold' color='var(--warm-green-700)'>{props.task.label}</Text>
                </SegmentedPicker>
            }
            {
                props.project &&
                <SegmentedPicker label='Project:' justify='space-between'>
                    <Tag color={props.project.color} type="priority">
                        <Text
                            width='fit-content'
                            weight='bold'
                            color={
                                colord(props.project.color)
                                    .isDark()
                                    ? 'var(--monochrome-100)'
                                    : 'var(--monochrome-800)'
                            }
                        >
                            {props.project.label}
                        </Text>
                    </Tag>
                </SegmentedPicker>
            }
        </Stack>
    </Stack>;

    return hasSurface
        ? <Surface data-interactive>{Component}</Surface>
        : Component
}

export default NoteCard;