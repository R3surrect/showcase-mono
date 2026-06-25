import type { InputUiRefComponent } from "../_shared/system.types";

export type EmojiPickerProps = InputUiRefComponent & {
    onEmojiChange: (emojiUnified: string) => void;
}