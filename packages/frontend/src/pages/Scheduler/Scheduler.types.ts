import type { HslColor } from "colord";
import type { LucideIcon } from "lucide-react";

export type TaskTagAction = (taskId: number, tagId: number) => void;
export type Views = 'all' | 'date' | 'archived' | 'inbox' | 'deleted';

export interface BaseStatTag {
    id: string;
    label: string;
    icon: LucideIcon;
    color: HslColor;
};

export interface ActionStatTag {
    action: (
        active: boolean,
    ) => void;
};

export interface NoActionStatTag {
    action?: never;
}

export interface ActiveStatTag { id: string; isActive: boolean };
export type StatTag = BaseStatTag & (ActionStatTag | NoActionStatTag);