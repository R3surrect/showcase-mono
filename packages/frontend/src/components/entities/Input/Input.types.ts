import type { InputHTMLAttributes, SVGProps } from "react";
import type { TextAlign } from "../_shared/system.types";
import type { INPUT_TYPE_TYPES } from "./Input.constants";

export type InputTypes = typeof INPUT_TYPE_TYPES[number];
export interface InputVars extends React.CSSProperties { '--input-text-align': string; }

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    id?: string;
    className?: string;
    name?: string;
    labelText: string;
    value?: string | number;
    disabled?: boolean;
    required?: boolean;
    type?: InputTypes;
    error?: string;
    textAlign?: TextAlign;
    hasEmojiPicker?: boolean;

    validate?: (value: string) => boolean | string;
    icon?: React.FC<SVGProps<SVGSVGElement>>;
    ref?: React.Ref<HTMLInputElement>;
}