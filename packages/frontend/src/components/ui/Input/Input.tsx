import { useId, useState } from 'react';
import { Eye, EyeClosed } from 'lucide-react';

import stylesObj from "./Input.module.css";

import Stack from '@components/ui/Stack/Stack';
import Text from '@components/ui/Text/Text';
import type { InputProps, InputVars } from '@/components/entities/ui/Input/Input.types';

const Input = ({
    disabled,
    error,
    type = 'text',
    id,
    labelText,
    ref,
    placeholder,
    textAlign = 'start',
    ...props
}: InputProps) => {
    const genId = useId();
    const controlId = id || genId;

    const [isPasswordHidden, setIsPasswordHidden] = useState(true);
    const isPassword = (type === 'password');
    const inputType = isPassword
        ? (isPasswordHidden ? 'password' : 'text')
        : type;

    return <div className={stylesObj.wrapper}>
        <Stack gap='sm' justify='space-between'>
            <Text as='label' htmlFor={controlId}>
                {labelText}
            </Text>

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
                    style={{ '--input-text-align': textAlign } as InputVars}
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
        </Stack>

        {error && <span className={stylesObj.error}>{error}</span>}

    </div>
};

export default Input;
