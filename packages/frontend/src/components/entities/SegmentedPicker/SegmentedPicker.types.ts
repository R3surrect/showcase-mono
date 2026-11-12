import type { DivUiRefComponent, Overflows } from "../_shared/system.types";

export interface SegmentedPickerProps extends DivUiRefComponent {
    label?: string;
    overflow?: Overflows;
    wrap?: boolean;
}