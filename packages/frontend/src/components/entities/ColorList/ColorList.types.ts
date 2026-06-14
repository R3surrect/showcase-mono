import type { HslColor } from "colord";

export interface ColorSet {
    id: string;
    color: HslColor;
};

export interface StateType {
    colorSet: ColorSet[];
    selectedColor: ColorSet;
    colorPickerColor: HslColor;
}