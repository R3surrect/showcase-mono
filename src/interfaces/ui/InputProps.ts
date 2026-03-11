import type { InputHTMLAttributes, SVGProps } from "react";

export default interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    id?: string;
    className?: string;
    name?: string;
    labelText: string;
    value?: string | number;
    disabled?: boolean;
    required?: boolean;
    type: "text" | "password" | "email" | "tel" | "number";
    error?: string;

    validate?: (value: string) => boolean | string;
    icon?: React.FC<SVGProps<SVGSVGElement>>;
    ref?: React.Ref<HTMLInputElement>;
}
