import { useState } from 'react';
import Picker, { Emoji, EmojiStyle, SkinTones, Theme, type PickerProps } from 'emoji-picker-react';
import {
    flip,
    FloatingPortal,
    offset,
    shift,
    useClick,
    useDismiss,
    useFloating,
    useInteractions,
    autoUpdate
} from '@floating-ui/react';

import Text from '@components/ui/Text/Text';
import Stack from '@components/ui/Stack/Stack';
import stylesObj from './EmojiPicker.module.css';
import { useDevice } from '@/hooks/useDevice';
import type { EmojiPickerProps } from '@/components/entities/EmojiPicker/EmojiPicker.types';
import { emojiToUnified } from '@/components/entities/EmojiPicker/EmojiPicker.constants';

const EmojiPicker = ({ placeholderEmoji, label, exportEmoji }: EmojiPickerProps) => {
    const [emoji, setEmoji] = useState(placeholderEmoji);
    const [isPickerOpen, setIsPickerOpen] = useState(false);
    
    const [wasOpenedAtLeastOnce, setWasOpenedAtLeastOnce] = useState(false);

    const isMobile = useDevice('mobile');

    const { refs, floatingStyles, context } = useFloating({
        open: isPickerOpen,
        placement: 'left',
        onOpenChange: (isOpenState) => {
            setIsPickerOpen(isOpenState);
            if (isOpenState) {
                setWasOpenedAtLeastOnce(true);
            }
        },
        middleware: [
            offset(16),
            shift(),
            flip(),
        ],
        whileElementsMounted: autoUpdate
    });

    const click = useClick(context);
    const dismiss = useDismiss(context);
    const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss]);

    const onEmojiChange = (emojiUnified: string) => {
        setEmoji(emojiUnified);
        exportEmoji(emojiUnified);
    };

    const emojiPickerMobileProps: Partial<PickerProps> = {
        width: '100%',
        height: '35dvh',
    };

    const pickerRender = wasOpenedAtLeastOnce ? (
        <Picker
            previewConfig={{ showPreview: false }}
            className={stylesObj.emojiPicker}
            defaultSkinTone={SkinTones.LIGHT}
            emojiStyle={EmojiStyle.GOOGLE}
            theme={Theme.AUTO}
            lazyLoadEmojis={true}
            searchDisabled
            onEmojiClick={(data) => onEmojiChange(data.unified)}
            {...(isMobile && emojiPickerMobileProps)}
        />
    ) : null;

    return (
        <Stack direction='column' gap='sm' justify='space-between'>
            {label && (
                <Text
                    size={4}
                    align='center'
                    as='span'
                    color='darkgray'
                >
                    {label}
                </Text>
            )}
            <button
                data-active={isPickerOpen}
                ref={refs.setReference}
                {...getReferenceProps()}
                className={stylesObj.emojiButton}
            >
                <Emoji unified={emojiToUnified(emoji)} size={24} emojiStyle={EmojiStyle.GOOGLE} />
            </button>

            <FloatingPortal>
                {!isMobile && (
                    <div
                        ref={refs.setFloating}
                        className={stylesObj.emojiPickerDesktopTabletWrapper}
                        style={{ ...floatingStyles }}
                        data-visible={isPickerOpen}
                        {...getFloatingProps()}
                    >
                        {pickerRender}
                    </div>
                )}
                {isMobile && (
                    <div
                        ref={refs.setFloating}
                        className={stylesObj.emojiPickerMobileWrapper}
                        data-visible={isPickerOpen}
                        {...getFloatingProps()}
                    >
                        {pickerRender}
                    </div>
                )}
            </FloatingPortal>
        </Stack>
    );
};

export default EmojiPicker;