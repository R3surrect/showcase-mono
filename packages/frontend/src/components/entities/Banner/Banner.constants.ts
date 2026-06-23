import { LucideInfo, LucideOctagonAlert, LucideTriangleAlert } from 'lucide-react';

export const VARIANT_ICONS = {
    'alert': LucideOctagonAlert,
    'info': LucideInfo,
    'warning': LucideTriangleAlert,
    'hint': LucideInfo,
} as const;