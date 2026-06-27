import type { DivUiComponent } from '../_shared/system.types';

export interface ContentHeaderProps extends DivUiComponent {
    title: string;
    subtitle?: string;
    children?: React.ReactNode;
}