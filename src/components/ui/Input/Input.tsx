import type InputProps from "@/interfaces/ui/InputProps";
import stylesObj from "./Input.module.css";
import { useId } from 'react';

const Input: React.FC<InputProps> = ({
    disabled,
    error,
    type,
    labelText,
    ...props
}) => {
    const controlId = useId();
    return <div className={stylesObj.inputWrapper}>
        
        <label className={stylesObj.label} htmlFor={controlId}>
            {labelText}
        </label>

        <input
            className={stylesObj.input}
            id={controlId}
            disabled={disabled || false}
            type={type}
            {...props}
            data-valid={error ? 'invalid' : 'valid'}
            aria-invalid={!!error}
        />

        {error && <span className={stylesObj.error}>{error}</span>}

    </div>
};

export default Input;
