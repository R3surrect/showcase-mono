import type { DivUiRefComponent } from "../_shared/system.types";

export interface SegmentedPickerProps extends DivUiRefComponent {
    label: string;
}

// export interface BaseSegmentedPickerProps extends DivUiRefComponent {
//     label: string;
// }

// export interface PropsWithField<T> {
//     name: string;
//     value: T;
// }

// export interface PropsWithoutField {
//     name?: never;
//     value?: never;
// }

// export type SegmentedPickerProps<T> = BaseSegmentedPickerProps & (PropsWithField<T> | PropsWithoutField)