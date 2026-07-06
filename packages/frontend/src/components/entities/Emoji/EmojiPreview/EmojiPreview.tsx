import type { DivUiComponent } from "@components/entities/_shared/system.types";
import { unifiedToEmoji } from "../EmojiPicker/EmojiPicker.constants";
import Stack from "@components/entities/Stack/Stack";

export interface EmojiPreviewProps extends DivUiComponent {
    emoji: string;
    setEmoji: (emoji: string) => void;
}

const EmojiPreview = ({ emoji, setEmoji }: EmojiPreviewProps) => {
    return <div
        onContextMenu={(e) => {
            e.preventDefault();
            setEmoji('');
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