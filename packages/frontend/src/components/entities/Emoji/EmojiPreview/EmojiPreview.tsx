import stylesObj from './EmojiPreview.module.css';
import { unifiedToEmoji } from "@components/entities/Emoji/EmojiPicker/EmojiPicker.constants";
import Stack from "@components/entities/Stack/Stack";
import type { EmojiPreviewProps } from "./EmojiPreview.types";

const EmojiPreview = ({ emoji, setEmoji, ...props }: EmojiPreviewProps) => {
    return <div
        className={stylesObj.emojiPreview}
        onContextMenu={(e) => {
            if (setEmoji) {
                e.preventDefault();
                setEmoji('');
            }
        }}
    >
        {
            props.name && <input
                type='hidden'
                id={props.name}
                value={emoji}
                {...props}
            />
        }
        <Stack justify="center">
            {unifiedToEmoji(emoji)}
        </Stack>
    </div >
}

export default EmojiPreview