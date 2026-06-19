import type { HslColor } from "colord";
import type { DivUiComponent } from "../_shared/system.types";

export interface ColorPickerProps extends DivUiComponent {
    exportColor: (e: HslColor) => void;
}