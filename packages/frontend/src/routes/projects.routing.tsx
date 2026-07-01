import type { PillPickerItem } from "@/components/entities/PillPicker/PillPicker.types";
import { LucideNotebook, LucidePen } from "lucide-react";

export const PROJECTS_ROUTES: PillPickerItem[] = [
    {
        icon: LucidePen,
        value: 'tasks',
        label: 'Tasks',
        to: 'tasks',
        isDefault: true,
        lazy: () => import("@pages/Projects/Tasks/Tasks.tsx"),
    },
    {
        icon: LucideNotebook,
        value: 'notes',
        label: 'Notes',
        to: 'notes',
        isDefault: false,
        lazy: () => import("@pages/Projects/Notes/Notes.tsx"),
    },
] as const;