import clsx from "clsx";
import type InputProps from "@/interfaces/ui/InputProps";
import stylesObj from "./Input.module.css";
// import { useState } from "react";

const Input: React.FC<InputProps> = ({ className, id, disabled, type, labelText, ...props }) => {
    // const valid = () => {
    //     return true;
    // };

    // const [validity, setValidity] = useState(false);

    // const handlerBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    //     setValidity(true);

    //     if (props.onBlur) props?.onBlur(e);
    // }


    return <div className={clsx(className, stylesObj.inputWrapper)}>
        <input
            className={stylesObj.input}
            id={id}
            data-valid
            disabled={disabled || false}
            placeholder=" "
            type={type}
            onFocus={() => console.log('focus')}
            onBlur={() => console.log('blur')}
            {...props}
        />
        <label
            className={stylesObj.label}
            htmlFor={id}
        >
            {labelText}
        </label>
    </div>
};

export default Input;