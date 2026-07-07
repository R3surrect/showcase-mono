import stylesObj from './EmojiPreview.module.css';
import { unifiedToEmoji } from "@components/entities/Emoji/EmojiPicker/EmojiPicker.constants";
import Stack from "@components/entities/Stack/Stack";
import type { EmojiPreviewProps } from "./EmojiPreview.types";

const EmojiPreview = ({ emoji, setEmoji }: EmojiPreviewProps) => {
    return <div
        className={stylesObj.emojiPreview}
        onContextMenu={(e) => {
            e.preventDefault();
            if (setEmoji) setEmoji('');
        }}
    >
        {/* <span> */}
        <Stack justify="center">
            {unifiedToEmoji(emoji)}
        </Stack>
        {/* </span> */}
    </div >
}

export default EmojiPreview