import { isValidElement } from 'react';
import { colord } from 'colord';
import { LucidePin } from 'lucide-react';
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
    isCompactView = false,
    ...props
}: ProjectProps) => {
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
            fill={isPinned ? 'var(--monochrome-500)' : 'var(--monochrome-200)'}
            stroke='var(--monochrome-500)'
        />
        <Stack direction="column" gap="md">
            <Stack direction="row" gap="sm" align='center'>
                {emoji &&
                    <div
                        className={stylesObj.iconWrapper}
                        style={{
                            '--project-color': colord(color || DEFAULT_HSL_COLOR.color).toHslString()
                        } as ProjectVars}
                    >
                        {
                            !isValidElement(emoji)
                                ? <EmojiPreview emoji={emoji.toString()} />
                                : emoji
                        }
                    </div>
                }
                <Stack direction="column" gap="sm" width={isCompactView ? '25rem' : 'auto'}>
                    <Heading level={3} variant="secondary">{label}</Heading>
                    <Text
                        color='var(--neutral-300)'
                        weight='bold'
                        size={6}
                        {...(isCompactView ? { truncate: true } : { wrap: true })}
                    >{details}</Text>
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
        color={colord(color).toHslString()}
        data-interactive
        {...props}
        id={props.id.toString()}
        overflow='hidden'
    >
        {projectCardRender}
    </Surface>
        : projectCardRender
}

export default ProjectCard