import type { PillPickerItem } from '@/components/ui/PillPicker/PillPicker';
import { LucideBell, LucideFocus, LucidePalette, LucideShieldCheck } from 'lucide-react';

export const PREFERENCES_ROUTES: PillPickerItem<string>[] = [
    // {
    //     icon: LucideTag,
    //     value: 'tags',
    //     label: 'Tags',
    //     to: 'tags',
    //     isDefault: true,
    //     lazy: async () => {
    //         const {Component} = await import('@pages/Preferences/Tags/Tags.tsx')
    //         return {Component}
    //     }
    // },
    {
        icon: LucideBell,
        value: 'notifications',
        label: 'Notifications',
        to: 'notifications',
        isDefault: true,
        lazy: async () => {
            const {Component} = await import('@pages/Preferences/Notifications/Notifications.tsx')
            return {Component}
        }
    },
    {
        icon: LucidePalette,
        value: 'view',
        label: 'View',
        to: 'view',
        isDefault: false,
        lazy: async () => {
            const {Component} = await import('@pages/Preferences/View/View.tsx')
            return {Component}
        }
    },
    {
        icon: LucideFocus,
        value: 'focus',
        label: 'Focus',
        to: 'focus',
        isDefault: false,
        lazy: async () => {
            const {Component} = await import('@pages/Preferences/Focus/Focus.tsx')
            return {Component}
        }
    },
    {
        icon: LucideShieldCheck,
        value: 'data',
        label: 'Data',
        to: 'data',
        isDefault: false,
        lazy: async () => {
            const {Component} = await import('@pages/Preferences/Data/Data.tsx')
            return {Component}
        }
    },
] as const;
