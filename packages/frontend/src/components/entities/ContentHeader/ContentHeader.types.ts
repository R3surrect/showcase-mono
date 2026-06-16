import type { HTMLAttributes } from 'react';

export interface ContentHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'style' | 'className'> {
    title: string;
    subtitle?: string;
    children?: React.ReactNode;
}