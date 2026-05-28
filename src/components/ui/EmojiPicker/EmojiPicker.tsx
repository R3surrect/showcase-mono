import { lazy, Suspense, useState } from 'react';
import stylesObj from './EmojiPicker.module.css'
import Text from '@components/ui/Text/Text';
import type { EmojiPickerProps } from './EmojiPicker.types';
import Stack from '@components/ui/Stack/Stack';
const Picker = lazy(() => import('emoji-picker-react'))
import { EmojiStyle, SkinTones, Theme, type PickerProps } from 'emoji-picker-react';
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
import { useDevice } from '@/hooks/useDevice';

const EmojiPicker = ({ placeholderEmoji, label, exportEmoji }: EmojiPickerProps) => {
    const isMobile = useDevice('mobile');

    const [uiState, setUiState] = useState({
        emoji: placeholderEmoji,
        isPickerOpen: false,
    });
    const { refs, floatingStyles, context } = useFloating({
        open: uiState.isPickerOpen,
        placement: 'bottom',
        onOpenChange: (isOpenState) => setUiState((prev) => ({
            ...prev,
            isPickerOpen: isOpenState
        })),
        middleware: [
            offset(16),
            shift({ padding: 8 }),
            flip({
                fallbackPlacements: ['bottom'],
                boundary: 'clippingAncestors'
            }),
        ],
        whileElementsMounted: autoUpdate
    })

    const click = useClick(context);
    const dismiss = useDismiss(context);
    const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss])

    const emojiPickerMobileProps: Partial<PickerProps> = {
        previewConfig: { showPreview: false },
        width: '100%',
        height: '35dvh',
    }

    const emojiRender =
        <Suspense fallback='...loading'>
            <Picker
                className={stylesObj.emojiPicker}
                defaultSkinTone={SkinTones.LIGHT}
                emojiStyle={EmojiStyle.GOOGLE}
                theme={Theme.AUTO}
                lazyLoadEmojis={true}
                searchDisabled
                onEmojiClick={
                    data => {
                        setUiState(
                            (prev) => ({ ...prev, emoji: data.emoji })
                        );
                        exportEmoji(data.emoji);
                    }
                }
                {...(isMobile && emojiPickerMobileProps)}
            />
        </Suspense>

    return <Stack direction='column' gap='sm' justify='space-between'>
        {label &&
            <Text
                size={4}
                align='center'
                as='span'
                color='darkgray'
            >
                {label}
            </Text>}
        <button
            data-active={uiState.isPickerOpen}
            ref={refs.setReference}
            {...getReferenceProps()}
            className={stylesObj.emojiButton}
        >
            {uiState.emoji}
        </button>

        <FloatingPortal>
            {(uiState.isPickerOpen && !isMobile) &&
                <div
                    className={stylesObj.emojiPickerDesktopTabletWrapper}
                    ref={refs.setFloating}
                    style={{
                        ...floatingStyles,
                        visibility: uiState.isPickerOpen ? 'visible' : 'hidden',
                        opacity: uiState.isPickerOpen ? 1 : 0,
                        pointerEvents: uiState.isPickerOpen ? 'auto' : 'none',

                    }}
                    {...getFloatingProps()}
                >
                    {emojiRender}
                </div>
            }
            {(uiState.isPickerOpen && isMobile) &&
                <div
                    ref={refs.setFloating}
                    className={stylesObj.emojiPickerMobileWrapper}
                    style={{ display: uiState.isPickerOpen ? 'block' : 'none' }}
                >
                    {emojiRender}
                </div>
            }

        </FloatingPortal>
    </Stack>
}

export default EmojiPicker;