import type { SVGProps } from "react";

export default interface InputProps {
    id?: string;
    className?: string;
    name?: string;
    labelText: string;
    value?: string | number;
    disabled?: boolean;
    placeholder?: string;
    required?: boolean;

    onChange?: (value: string) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;

    validate?: (value: string) => boolean | string;
    icon?: React.FC<SVGProps<SVGSVGElement>>;
}