import { useId, useState } from 'react';
import { Eye, EyeClosed, LucideSmile } from 'lucide-react';

import stylesObj from "./Input.module.css";

import Stack from '@components/entities/Stack/Stack';
import Text from '@components/entities/Text/Text';
import type { InputProps, InputVars } from '@components/entities/Input/Input.types';
import Button from '@components/entities/Button/Button';
import Popover from '@components/shared/Popover/Popover';
import EmojiPicker from '@components/entities/Emoji/EmojiPicker/EmojiPicker';
import { unifiedToEmoji } from '@components/entities/Emoji/EmojiPicker/EmojiPicker.constants';

const Input = ({
    disabled = false,
    error,
    type = 'text',
    id,
    labelText,
    ref: externalRef,
    placeholder,
    textAlign = 'start',
    hasEmojiPicker = false,
    ...props
}: InputProps) => {

    const [isPasswordHidden, setIsPasswordHidden] = useState(true);
    const [text, setText] = useState('');

    const genId = useId();
    const controlId = id || genId;

    const isPassword = (type === 'password');
    const inputType = isPassword
        ? (isPasswordHidden ? 'password' : 'text')
        : type;

    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const emojiButtonRender = (
        // <Button variant='transparent' className={stylesObj.additionalElement}>
        <Button variant='transparent'>
            <LucideSmile stroke='var(--neutral-500)' />
        </Button>
    )

    return <div className={stylesObj.wrapper}>
        <Stack gap='sm' justify='space-between'>
            <Text as='label' htmlFor={controlId} size={6} weight='bolder'>
                {labelText}
            </Text>

            <div className={stylesObj.inputWrapper} data-valid={error ? 'invalid' : 'valid'}>
                <input
                    {...props}
                    className={stylesObj.input}
                    id={controlId}
                    disabled={disabled}
                    type={inputType}
                    ref={externalRef}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    style={{ '--input-text-align': textAlign } as InputVars}
                    aria-invalid={!!error}
                    placeholder={
                        isPassword
                            ? (isPasswordHidden ? '*****************' : placeholder)
                            : placeholder
                    }
                />
                {type === 'password' && (
                    isPasswordHidden
                        ? <EyeClosed
                            className={stylesObj.additionalElement}
                            onClick={() => setIsPasswordHidden(!isPasswordHidden)}
                            stroke='var(--neutral-500)'
                        />
                        : <Eye
                            className={stylesObj.additionalElement}
                            onClick={() => setIsPasswordHidden(!isPasswordHidden)}
                            stroke='var(--neutral-500)'
                        />
                )}
                {
                    hasEmojiPicker &&
                    <Popover
                        isOpen={isPopoverOpen}
                        setIsOpen={setIsPopoverOpen}
                        triggerElement={emojiButtonRender}
                        placement='bottom-end'
                    >
                        {/*
                            //TODO реализовать вставку на место курсора, не в конец
                        */}
                        <EmojiPicker
                            onEmojiChange={(emojiUnified: string) => setText(
                                prev => `${prev}${unifiedToEmoji(emojiUnified)}`
                            )}
                        />
                    </Popover>
                }
            </div>
        </Stack>
        {error && <span className={stylesObj.error}>{error}</span>}
    </div>
};

export default Input;
