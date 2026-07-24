import { isValidElement } from 'react';
import { LucidePin } from 'lucide-react';
import { getHslString } from '@components/entities/ColorList/ColorList.constants';
import { DEFAULT_HSL_COLOR } from '@components/entities/_shared/system.constants';
import EmojiPreview from '@components/entities/Emoji/EmojiPreview/EmojiPreview';
import Progress from '@components/entities/Progress/Progress';
import Heading from "@components/entities/Heading/Heading";
import Surface from "@components/entities/Surface/Surface";
import Stack from "@components/entities/Stack/Stack";
import Text from '@components/entities/Text/Text';
import type { ProjectProps, ProjectVars } from './ProjectCard.types';
import stylesObj from './ProjectCard.module.css';
// import { sumTasks } from './ProjectCard.constants';

const ProjectCard = ({
    emoji,
    color = DEFAULT_HSL_COLOR.color,
    isPinned = false,
    label,
    details,
    // tasks,
    hasSurface = true,
    onPinClick,
    ...props
}: ProjectProps) => {
    // const tasksCount = sumTasks(tasks)
    console.log(color);

    const pinClickHandler = (e: React.MouseEvent<SVGSVGElement>) => {
        e.stopPropagation();
        onPinClick(props.id)
    }

    const pinProps = {
        size: 20,
        className: stylesObj.pin,
        strokeWidth: 1,
        onClick: pinClickHandler,
        'data-pinned': isPinned,
    }

    const projectCardRender = <>
        <LucidePin
            {...pinProps}
            fill={isPinned ? getHslString(color ? { ...color, l: 75 } : DEFAULT_HSL_COLOR.color) : 'transparent'}
            stroke='var(--monochrome-700)'
        />
        <Stack direction="column" gap="md">
            <Stack direction="row" gap="sm" align='center'>
                {emoji &&
                    <div
                        className={stylesObj.iconWrapper}
                        style={{ '--project-color': getHslString(color || DEFAULT_HSL_COLOR.color) } as ProjectVars}
                    >
                        {
                            isValidElement(emoji)
                                ? emoji
                                : <EmojiPreview emoji={emoji.toString()} />
                        }
                    </div>
                }
                <Stack direction="column" gap="sm">
                    <Heading level={3} variant="secondary">{label}</Heading>
                    <Text color='var(--neutral-300)' weight='bold' size={6}>{details}</Text>
                </Stack>
            </Stack>
            <Stack direction='column' gap='sm'>
                <Text
                    color='var(--neutral-850    )'
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
        id={props.id.toString()}
        data-interactive
    >
        {projectCardRender}
    </Surface>
        : projectCardRender
}

export default ProjectCard