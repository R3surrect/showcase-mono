import type { HslColor } from "colord";
import type { InputUiRefComponent } from "../_shared/system.types";
import type { Ref } from "react";

export interface ColorSet {
    id: string;
    color: HslColor;
};

export interface StateType {
    colorSet: ColorSet[];
    selectedColor: ColorSet;
    colorPickerColor: HslColor;
}

export interface ColorListProps extends InputUiRefComponent {
    ref?: Ref<HTMLInputElement>
}