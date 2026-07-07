import { unifiedToEmoji } from "../EmojiPicker/EmojiPicker.constants";
import Stack from "@components/entities/Stack/Stack";
import type { EmojiPreviewProps } from "./EmojiPreview.types";

const EmojiPreview = ({ emoji, setEmoji }: EmojiPreviewProps) => {
    return <div
        onContextMenu={(e) => {
            e.preventDefault();
            if (setEmoji) setEmoji('');
        }}
    >
        <span>
            <Stack justify="center">
                {unifiedToEmoji(emoji)}
            </Stack>
        </span>
    </div >
}

export default EmojiPreview