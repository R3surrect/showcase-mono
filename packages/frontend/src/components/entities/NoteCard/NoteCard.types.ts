import type { HslColor } from "colord";

export interface NoteCardProps {
    title: string;
    details: string;
    project?: {
        label: string;
        color: HslColor;
    };
    task?: {
        label: string;
    };
    hasSurface?: boolean;
    toolbar?: React.ReactNode;
}