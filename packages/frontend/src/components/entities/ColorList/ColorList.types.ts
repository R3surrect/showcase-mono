import type { HslColor } from "colord";
import type { ColorSet, DivUiRefComponent } from "../_shared/system.types";

export interface StateType {
    colorSet: ColorSet[];
    selectedColor: ColorSet;
    colorPickerColor: HslColor;
}

export interface ColorListProps extends DivUiRefComponent {
    value: HslColor;
    onColorChange: (color: HslColor) => void;
}