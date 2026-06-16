import stylesObj from './Project.module.css';
import Surface from "@components/entities/Surface/Surface";
import Stack from "@components/entities/Stack/Stack";
import Heading from "../Heading/Heading";
import type { ProjectProps, ProjectVars } from './Project.types';
import { Emoji, EmojiStyle } from 'emoji-picker-react';
import { getHslString } from '@components/entities/ColorList/ColorList.constants';
import { DEFAULT_HSL_COLOR } from '@components/entities/_shared/system.constants';
import { emojiToUnified } from '@components/entities/EmojiPicker/EmojiPicker.constants';
import Text from '@components/entities/Text/Text';
import Progress from '../Progress/Progress';
import { sumTasks } from './Project.constants';
import { isValidElement } from 'react';
import { LucidePin } from 'lucide-react';

const Project = ({
    emoji,
    color,
    isPinned = false,
    label,
    description,
    tasks,
    ...props
}: ProjectProps) => {
    const tasksCount = sumTasks(tasks)

    const pinProps = {
        size: 20,
        className: stylesObj.pin,
        strokeWidth: 1,
        onClick: () => { console.log(isPinned) },
        'data-pinned': isPinned,
    }

    return <Surface variant="solid" isAnimated {...props}>
        <LucidePin
            {...pinProps}
            fill={
                isPinned ? getHslString(color ? { ...color, l: 75 } : DEFAULT_HSL_COLOR) : 'transparent'
            }
            stroke='var(--monochrome-700)'
        />
        <Stack direction="column" gap="md">
            <Stack direction="row" gap="sm" align='center'>
                {emoji &&
                    <div
                        className={stylesObj.iconWrapper}
                        style={{
                            '--project-color': getHslString(color || DEFAULT_HSL_COLOR)
                        } as ProjectVars}
                    >
                        {
                            isValidElement(emoji)
                                ? emoji
                                : <Emoji unified={emojiToUnified(emoji.toString())} size={20} emojiStyle={EmojiStyle.GOOGLE} />
                        }
                    </div>
                }
                <Stack direction="column" gap="sm">
                    <Heading level={3} variant="secondary">{label}</Heading>
                    <Text color='lightgray' weight='bold' size={6}>{description}</Text>
                </Stack>
            </Stack>
            <Stack direction='column' gap='sm'>
                <Text
                    color='lightgray'
                    weight='bold'
                    size={6}
                >
                    {tasksCount} tasks ({tasks.completed} completed)
                </Text>
                <Progress all={tasksCount} value={tasks.completed} color={color} />
            </Stack>
        </Stack>
    </Surface>
}

export default Project