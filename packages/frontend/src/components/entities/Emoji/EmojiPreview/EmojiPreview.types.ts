import type { DivUiComponent } from "@components/entities/_shared/system.types";

export interface EmojiPreviewProps extends DivUiComponent {
    emoji: string;
    setEmoji?: (emoji: string) => void;
}