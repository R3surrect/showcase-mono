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

const tasksMock = { completed: 25, pending: 50, overdue: 30, scheduled: 40, inProgress: 15 };

const sortTasks = (tasks) => {
    const keys = Object.keys(tasks);
    const sortedTasks = {};

    keys.sort((a, b) => tasks[a] - tasks[b])

    for (const key of keys) {
        sortedTasks[key] = tasks[key];
    }
}

const Project = ({ emoji, color, isPinned = false, label, description }: ProjectProps) => {

    return <Surface variant="solid" isAnimated>
        <Stack direction="column" gap="md">
            <Stack direction="row" gap="md" align='center'>
                {emoji &&
                    <div
                        className={stylesObj.iconWrapper}
                        style={{
                            '--project-color': getHslString(color || DEFAULT_HSL_COLOR)
                        } as ProjectVars}
                    >
                        {typeof emoji === 'string'
                            ? <Emoji unified={emojiToUnified(emoji)} size={20} emojiStyle={EmojiStyle.GOOGLE} />
                            : emoji
                        }
                    </div>
                }
                <Stack direction="column" gap="sm">
                    <Heading level={3} variant="secondary">{label}</Heading>
                    <Text color='lightgray' weight='bold' size={6}>{description}</Text>
                </Stack>
            </Stack>
            <Text color='lightgray' weight='bold' size={6}>{description}</Text>
            <div className={stylesObj.progress}>
                <div className={stylesObj.completed} id='completed'></div>
                <div className={stylesObj.pending} id='pending'></div>
                <div className={stylesObj.overdue} id='overdue'></div>
                <div className={stylesObj.scheduled} id='scheduled'></div>
                <div className={stylesObj.in_progress} id='in_progress'></div>
            </div>
        </Stack>
    </Surface>
}

export default Project