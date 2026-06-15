import type { HslColor } from "colord";
import type { DivUiComponent } from "../_shared/system.types"

export interface ProjectProps extends Omit<DivUiComponent, 'color'> {
    emoji?: string | React.ReactNode;
    label: string;
    color?: HslColor;
    isPinned?: boolean;
    description?: string;
}

export interface ProjectVars extends React.CSSProperties {
    '--project-color'?: string;
}