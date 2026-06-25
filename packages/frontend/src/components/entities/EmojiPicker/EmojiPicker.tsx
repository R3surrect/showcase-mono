import Picker, { EmojiStyle, SkinTones, Theme } from 'emoji-picker-react';
import Stack from '@components/entities/Stack/Stack';
import stylesObj from './EmojiPicker.module.css';
// import { useDevice } from '@/hooks/useDevice';
import type { EmojiPickerProps } from './EmojiPicker.types';

const EmojiPicker = ({ onEmojiChange }: EmojiPickerProps) => {
    // const isMobile = useDevice('mobile');

    // const emojiPickerMobileProps: Partial<PickerProps> = {
    //     width: '100%',
    //     height: '35dvh',
    // };

    const pickerRender =
        <Picker
            previewConfig={{ showPreview: false }}
            className={stylesObj.emojiPicker}
            defaultSkinTone={SkinTones.LIGHT}
            emojiStyle={EmojiStyle.NATIVE}
            theme={Theme.AUTO}
            lazyLoadEmojis={true}
            searchDisabled
            onEmojiClick={(data) => onEmojiChange(data.unified)}
        // {...(isMobile && emojiPickerMobileProps)}
        />;

    return (
        <Stack direction='column' gap='sm' justify='space-between'>
            <div className={
                // !isMobile
                //     ? stylesObj.emojiPickerDesktopTabletWrapper
                //     : stylesObj.emojiPickerMobileWrapper
                stylesObj.emojiPickerDesktopTabletWrapper
            }>
                {pickerRender}
            </div>

        </Stack>
    );
};

export default EmojiPicker;