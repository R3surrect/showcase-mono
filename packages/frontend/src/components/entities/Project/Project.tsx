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
            <progress
                className={stylesObj.progress}
                style={{
                    '--project-color': getHslString(color || DEFAULT_HSL_COLOR)
                } as ProjectVars}
                value="70"
                max="100"
            />
        </Stack>
    </Surface>
}

export default Project