import type { PillPickerItem } from '@/components/ui/PillPicker/PillPicker.types';
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
        value: 'tagTemplates',
        label: 'Tag Templates',
        to: 'tagTemplates',
        isDefault: false,
        lazy: () => import('@pages/Templates/TagTemplates/TagTemplates.tsx')
    },
    {
        icon: LucideTag,
        value: 'tags',
        label: 'Tags',
        to: 'tags',
        isDefault: false,
        lazy: () => import('@pages/Templates/Tags/Tags.tsx'),
    },
] as const
