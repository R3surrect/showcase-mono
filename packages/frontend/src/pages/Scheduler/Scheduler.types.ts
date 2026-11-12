import type { HslColor } from "colord";
import type { LucideIcon } from "lucide-react";
import type { statViewTypes, views } from "./Scheduler.constants";

export type TaskTagAction = (taskId: number, tagId: number) => void;
export type Views = typeof views[number];

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

export type StatViewTypes = typeof statViewTypes[number];

export interface NoActionStatTag {
    action?: never;
}

export interface ActiveStatTag { id: string; isActive: boolean };
export type StatTag = BaseStatTag & (ActionStatTag | NoActionStatTag);