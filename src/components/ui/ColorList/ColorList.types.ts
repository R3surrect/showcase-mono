export interface ColorSet {
    id: string;
    color: string;
};

export interface HSLType {
    h: number;
    s: number;
    l: number;
}

export interface StateType {
    colorSet: ColorSet[];
    selectedColor: ColorSet;
    colorPickerColor: HSLType;
}