import type { ReactNode } from "react";

interface DefaultOptionType {
    variant?: 'default';
    id: number;
    emoji?: string | null;
    label: string;
}

interface CustomOptionType {
    variant: 'custom';
    id: number;
    children: ReactNode;
}

export type OptionType =
    | DefaultOptionType
    | CustomOptionType;