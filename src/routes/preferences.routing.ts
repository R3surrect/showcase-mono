import type { PillPickerItem } from '@/components/ui/PillPicker/PillPicker';
import { LucideBell, LucideFocus, LucidePalette, LucideShieldCheck } from 'lucide-react';

export const PREFERENCES_ROUTES: PillPickerItem[] = [
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
        isDefault: false,
        lazy: () => import('@pages/Preferences/View/View.tsx')
    },
    {
        icon: LucideFocus,
        value: 'focus',
        label: 'Focus',
        to: 'focus',
        isDefault: false,
        lazy: () => import('@pages/Preferences/Focus/Focus.tsx')
    },
    {
        icon: LucideShieldCheck,
        value: 'data',
        label: 'Data',
        to: 'data',
        isDefault: false,
        lazy: () => import('@pages/Preferences/Data/Data.tsx')
    },
] as const;
