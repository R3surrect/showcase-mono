import type { ComponentPropsWithRef } from "react";

export interface SelectProps extends ComponentPropsWithRef<'select'> {
    id?: string;
    value: string;
    setValue: (value: string) => void;
    children: React.ReactNode;
    name?: string;
    labelText?: string;
    ref?: React.Ref<HTMLSelectElement>;
}