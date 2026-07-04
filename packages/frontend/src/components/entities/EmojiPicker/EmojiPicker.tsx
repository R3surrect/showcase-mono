import Picker, { EmojiStyle, SkinTones, SuggestionMode, Theme } from 'emoji-picker-react';
import clsx from 'clsx';
import Stack from '@components/entities/Stack/Stack';
import stylesObj from './EmojiPicker.module.css';
import type { EmojiPickerProps } from './EmojiPicker.types';
import { emojiPickerKeyboardProps } from './EmojiPicker.constants';

const EmojiPicker = ({ onEmojiChange, variant = 'default', ...props }: EmojiPickerProps) => {
    return (
        <Stack direction='column' gap='sm' justify='space-between'>
            <div className={
                variant === 'keyboard'
                    ? stylesObj.emojiPickerKeyboardWrapper
                    : stylesObj.emojiPickerNativeWrapper
            }>
                <Picker
                    className={clsx(stylesObj.emojiPicker, stylesObj.emojiPickerLight)}
                    onEmojiClick={(data) => onEmojiChange(data.unified)}
                    suggestedEmojisMode={SuggestionMode.FREQUENT}
                    previewConfig={{ showPreview: false }}
                    defaultSkinTone={SkinTones.LIGHT}
                    emojiStyle={EmojiStyle.NATIVE}
                    lazyLoadEmojis={true}
                    theme={Theme.AUTO}
                    searchDisabled
                    {...(variant === 'keyboard' && emojiPickerKeyboardProps)}
                    {...props}
                />
            </div>
        </Stack>
    );
};

export default EmojiPicker;