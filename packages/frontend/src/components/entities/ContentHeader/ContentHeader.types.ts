import type { DivUiComponent } from '../_shared/system.types';

export interface ContentHeaderProps extends DivUiComponent {
    title: string;
    subElement?: React.ReactNode;
    children?: React.ReactNode;
}