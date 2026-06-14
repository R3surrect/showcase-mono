import { emojiToUnified } from '../EmojiPicker/EmojiPicker.constants';
import type { ColorVariable, TagProps } from '@/components/entities/Tag/Tag.types';
import stylesObj from './Tag.module.css';
import { useId } from 'react';
import { Emoji } from 'emoji-picker-react';

const Tag = ({ label, emoji, color, id, ...props }: TagProps) => {
    const genId = useId();

    return <div
        id={id ? id.toString() : genId}
        className={stylesObj.tag}
        style={{ '--tag-color': `hsl(${color.h}, ${color.s}%, ${color.l}%)` } as ColorVariable}
        {...props}
    >
        <Emoji unified={emojiToUnified(emoji)} size={16}/>
        <p>{label}</p>
    </div>
}

export default Tag;