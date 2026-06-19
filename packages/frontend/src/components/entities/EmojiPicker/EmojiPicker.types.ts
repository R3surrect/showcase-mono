import type { InputUiRefComponent } from "../_shared/system.types";

export interface EmojiPickerProps extends InputUiRefComponent{
    placeholderEmoji: string;
    label?: string;
    // exportEmoji: (emoji: string) => void;
}