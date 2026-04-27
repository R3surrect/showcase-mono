import type { PillPickerItem } from '@/components/ui/PillPicker/PillPicker';
import { LucideBell, LucideFocus, LucidePalette, LucideShieldCheck, LucideTag } from 'lucide-react';

export const PREFERENCES_ROUTES: PillPickerItem<string>[] = [
    {
        icon: LucideTag,
        value: 'tags',
        label: 'Tags',
        to: 'tags',
        isDefault: true,
        lazy: () => import('@pages/Preferences/Tags/Tags.tsx')
    },
    {
        icon: LucideBell,
        value: 'notifications',
        label: 'Notifications',
        to: 'notifications',
        isDefault: true,
        lazy: () => import('@pages/Preferences/Notifications/Notifications.tsx')
    },
    {
        icon: LucidePalette,
        value: 'view',
        label: 'View',
        to: 'view',
        isDefault: true,
        lazy: () => import('@pages/Preferences/View/View.tsx')
    },
    {
        icon: LucideFocus,
        value: 'focus',
        label: 'Focus',
        to: 'focus',
        isDefault: true,
        lazy: () => import('@pages/Preferences/Focus/Focus.tsx')
    },
    {
        icon: LucideShieldCheck,
        value: 'data',
        label: 'Data',
        to: 'data',
        isDefault: true,
        lazy: () => import('@pages/Preferences/Data/Data.tsx')
    },
] as const;
