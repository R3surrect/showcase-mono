import type { HslColor } from "colord";
import type { DivUiComponent } from "../_shared/system.types";

export interface ProgressProps extends Omit<DivUiComponent, 'color'> {
    color?: HslColor;
    all: number;
    value: number;
}

export interface ProgressVars extends React.CSSProperties {
    '--progress-value-width': string;
    '--progress-color': string;
}