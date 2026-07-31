import type { PillPickerItem } from '@/components/entities/PillPicker/PillPicker.types';
import { LucideCircleCheck, LucideFileText, LucideFolderOpen } from 'lucide-react';

export const FAVORITES_ROUTES: PillPickerItem[] = [
    {
        icon: LucideCircleCheck,
        value: 'tasks',
        label: 'Tasks',
        to: 'tasks',
        isDefault: true,
        lazy: () => import('@/pages/Favorites/Tasks/Tasks'),
    },
    {
        icon: LucideFileText,
        value: 'notes',
        label: 'Notes',
        to: 'notes',
        isDefault: false,
        lazy: () => import('@/pages/Favorites/Notes/Notes')
    },
    {
        icon: LucideFolderOpen,
        value: 'projects',
        label: 'Projects',
        to: 'projects',
        isDefault: false,
        lazy: () => import('@/pages/Favorites/Projects/Projects')
    },

] as const;
