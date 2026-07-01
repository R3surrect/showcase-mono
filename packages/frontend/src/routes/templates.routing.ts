import type { PillPickerItem } from '@/components/entities/PillPicker/PillPicker.types';
import { LucideCircleCheck, LucideTag } from 'lucide-react';

export const TEMPLATES_ROUTES: PillPickerItem[] = [
    {
        icon: LucideCircleCheck,
        value: 'tasks',
        label: 'Tasks',
        to: 'tasks',
        isDefault: true,
        lazy: () => import('@pages/Templates/Tasks/Tasks.tsx'),
    },
    {
        icon: LucideTag,
        value: 'tags',
        label: 'Tags',
        to: 'tags',
        isDefault: false,
        lazy: () => import('@pages/Templates/Tags/Tags.tsx'),
    },
] as const;
