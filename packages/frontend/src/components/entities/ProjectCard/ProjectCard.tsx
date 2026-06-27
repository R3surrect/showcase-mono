import stylesObj from './ProjectCard.module.css';
import Surface from "@components/entities/Surface/Surface";
import Stack from "@components/entities/Stack/Stack";
import Heading from "../Heading/Heading";
import type { ProjectProps, ProjectVars } from './ProjectCard.types';
import { Emoji, EmojiStyle } from 'emoji-picker-react';
import { getHslString } from '@components/entities/ColorList/ColorList.constants';
import { DEFAULT_HSL_COLOR } from '@components/entities/_shared/system.constants';
import { emojiToUnified } from '@components/entities/EmojiPicker/EmojiPicker.constants';
import Text from '@components/entities/Text/Text';
import Progress from '../Progress/Progress';
// import { sumTasks } from './ProjectCard.constants';
import { isValidElement } from 'react';
import { LucidePin } from 'lucide-react';

const ProjectCard = ({
    emoji,
    color = {
        h: 41,
        s: 23,
        l: 43,
    },
    isPinned = false,
    label,
    details,
    // tasks,
    hasSurface = true,
    ...props
}: ProjectProps) => {
    // const tasksCount = sumTasks(tasks)

    const pinProps = {
        size: 20,
        className: stylesObj.pin,
        strokeWidth: 1,
        onClick: () => { console.log(isPinned) },
        'data-pinned': isPinned,
    }

    const projectCardRender = <>
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
                    <Text color='lightgray' weight='bold' size={6}>{details}</Text>
                </Stack>
            </Stack>
            <Stack direction='column' gap='sm'>
                <Text
                    color='lightgray'
                    weight='bold'
                    size={6}
                >
                    {/* {tasksCount} tasks ({tasks.completed} completed) */}
                    {24} tasks ({12} completed)
                </Text>
                <Progress all={24} value={12} color={color} />
                {/* <Progress all={tasksCount} value={tasks.completed} color={color} /> */}
            </Stack>

        </Stack>
    </>

    return hasSurface ? <Surface
        variant="outline"
        isAnimated
        color={getHslString(color)}
        width='max'
        {...props}
    >
        {projectCardRender}
    </Surface>
        : projectCardRender
}

export default ProjectCard