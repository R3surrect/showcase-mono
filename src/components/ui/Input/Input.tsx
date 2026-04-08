import { useId, useState } from 'react';
import { Eye, EyeClosed } from 'lucide-react';

import type InputProps from "@/interfaces/ui/InputProps";
import stylesObj from "./Input.module.css";

const Input = ({
    disabled,
    error,
    type,
    id,
    labelText,
    ref,
    placeholder,
    ...props
}: InputProps) => {
    const controlId = id || useId();

    const [isPasswordHidden, setIsPasswordHidden] = useState(true);
    const isPassword = (type === 'password');
    const inputType = isPassword
        ? (isPasswordHidden ? 'password' : 'text')
        : type;

    return <div className={stylesObj.wrapper}>

        <label className={stylesObj.label} htmlFor={controlId}>
            {labelText}
        </label>

        <div className={stylesObj.inputWrapper} data-valid={error ? 'invalid' : 'valid'}>
            <input
                className={stylesObj.input}
                id={controlId}
                disabled={disabled || false}
                type={inputType}
                ref={ref}
                placeholder={
                    isPassword
                        ? (isPasswordHidden ? '*****************' : placeholder)
                        : placeholder
                }
                {...props}
                aria-invalid={!!error}
            />
            {type === 'password' && (
                isPasswordHidden
                    ? <EyeClosed
                        className={stylesObj.eye}
                        onClick={() => setIsPasswordHidden(!isPasswordHidden)}
                    />
                    : <Eye
                        className={stylesObj.eye}
                        onClick={() => setIsPasswordHidden(!isPasswordHidden)}
                    />
            )}
        </div>

        {error && <span className={stylesObj.error}>{error}</span>}

    </div>
};

export default Input;
