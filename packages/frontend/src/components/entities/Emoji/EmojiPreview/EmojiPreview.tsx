import stylesObj from './EmojiPreview.module.css';
import { unifiedToEmoji } from "@components/entities/Emoji/EmojiPicker/EmojiPicker.constants";
import Stack from "@components/entities/Stack/Stack";
import type { EmojiPreviewProps } from "./EmojiPreview.types";

const EmojiPreview = ({ emoji, setEmoji, name }: EmojiPreviewProps) => {
    return <div
        className={stylesObj.emojiPreview}
        onContextMenu={(e) => {
            e.preventDefault();
            if (setEmoji) setEmoji('');
        }}
    >
        {
            name && <input
                type='hidden'
                name={name}
                id={name}
                value={emoji}
            />
        }
        <Stack justify="center">
            {unifiedToEmoji(emoji)}
        </Stack>
    </div >
}

export default EmojiPreview