import type { HslColor } from "colord";

export interface NoteCardProps {
    title: string;
    details: string;
    projectLabel: string;
    projectColor: HslColor;
    taskLabel: string;
    hasSurface?: boolean;
    toolbar?: React.ReactNode;
}