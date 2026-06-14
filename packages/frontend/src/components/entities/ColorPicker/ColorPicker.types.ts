import type { HslColor } from "colord";

export interface ColorPickerProps {
    exportColor: (e: HslColor) => void;
}