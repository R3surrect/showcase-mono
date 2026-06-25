import type { HslColor } from "colord";
import type { DivUiComponent } from "../_shared/system.types";

export interface ColorPickerProps extends Omit<DivUiComponent, 'color'> {
    exportColor: (e: HslColor) => void;
    color: HslColor;
}