import type InputProps from "@/interfaces/ui/InputProps";
import stylesObj from "./Input.module.css";
import { useId } from 'react';

const Input = ({
    disabled,
    error,
    type,
    id,
    labelText,
    ref,
    ...props
}: InputProps) => {
    const controlId = id || useId();
    return <div className={stylesObj.inputWrapper}>

        <label className={stylesObj.label} htmlFor={controlId}>
            {labelText}
        </label>

        <input
            className={stylesObj.input}
            id={controlId}
            disabled={disabled || false}
            type={type}
            ref={ref}
            {...props}
            data-valid={error ? 'invalid' : 'valid'}
            aria-invalid={!!error}
        />

        {error && <span className={stylesObj.error}>{error}</span>}

    </div>
};

export default Input;
