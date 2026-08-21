import { useId, useState } from "react";
import type { InputTypes } from "./Input.types";

interface UseInputComponentProps {
    id?: string;
    type: InputTypes;
    isPassword?: boolean;
}

export const useInputComponent = ({ id, type }: UseInputComponentProps) => {
    const [isPasswordHidden, setIsPasswordHidden] = useState(true);
    const [text, setText] = useState('');

    const genId = useId();
    const controlId = id || genId;

    const isPassword = (type === 'password');
    const inputType = isPassword
        ? (isPasswordHidden ? 'password' : 'text')
        : type;

    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    return {
        isPasswordHidden,
        setIsPasswordHidden,
        text,
        setText,
        controlId,
        inputType,
        isPopoverOpen,
        setIsPopoverOpen,
        isPassword
    }
}