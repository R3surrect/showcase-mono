import type { InputUiRefComponent } from "../_shared/system.types";
import type { VARIANT_TYPES } from "./EmojiPicker.constants";

export type Variants = typeof VARIANT_TYPES[number];

export type EmojiPickerProps = InputUiRefComponent & {
    variant?: Variants;
    onEmojiChange: (emojiUnified: string) => void;
}