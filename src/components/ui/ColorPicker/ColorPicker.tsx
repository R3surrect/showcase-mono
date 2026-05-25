import { useEffect, useState } from 'react'
import Heading from '@components/ui/Heading/Heading.tsx';
import Stack from '@components/ui/Stack/Stack.tsx';
import stylesObj from './ColorPicker.module.css';
import { LucidePipette } from 'lucide-react';
import Button from '@components/ui/Button/Button';
import { HslColorPicker } from 'react-colorful'
import Popover from '@/components/shared/Popover/Popover';
import { autoUpdate, flip, offset, shift, useClick, useDismiss, useFloating, useInteractions } from '@floating-ui/react';
import type { ColorSet } from './ColorPicker.types';
import { getLocalStorageColors, INITIAL_COLORS } from './ColorPicker.constants';

export const ColorPicker = () => {
    const [colorSet, setColorSet] = useState<ColorSet[]>(getLocalStorageColors());

    const [uiState, setUiState] = useState({
        selectedColor: INITIAL_COLORS[0],
        isColorPickerActive: false,
        colorPickerColor: {
            h: 0,
            s: 0,
            l: 0,
        },
    })

    const { refs, context, floatingStyles } = useFloating({
        open: uiState.isColorPickerActive,

        onOpenChange: (open) => setUiState(prev => ({
            ...prev,
            isColorPickerActive: open
        })),

        placement: 'top',
        whileElementsMounted: autoUpdate,
        middleware: [
            offset(12),
            flip(),
            shift(),
        ]
    });

    const dismiss = useDismiss(context);
    const click = useClick(context);
    const { getFloatingProps, getReferenceProps } = useInteractions([click, dismiss]);

    useEffect(() => {
        localStorage.setItem('colorSet', JSON.stringify(colorSet));
    }, [colorSet])

    return <Stack gap='md'>
        <Heading level={6} variant='secondary'>Цвет</Heading>
        <Stack wrap={true} direction='row'>
            {[...INITIAL_COLORS, ...colorSet].map((item) => (
                <div
                    key={item.id}
                    className={stylesObj.colorElement}
                    onClick={() => setUiState((prev) => ({ ...prev, selectedColor: item }))}
                    style={{
                        backgroundColor: `${item.color}`,
                        boxShadow: item.id === uiState.selectedColor.id
                            ? `0 0 0 3px var(--neutral-0), 0 0 0 6px ${uiState.selectedColor.color}`
                            : ''
                    }}
                ></div>
            ))}
            <div
                className={stylesObj.colorPipette}
                ref={refs.setReference}
                style={{
                    border: `2px solid hsl(${Math.round(uiState.colorPickerColor.h)}, ${Math.round(uiState.colorPickerColor.s)}%, ${Math.round(uiState.colorPickerColor.l)}%)`
                }}
                {...getReferenceProps()}
            >
                <LucidePipette width={24} height={24} stroke='var(--warm-green-700)' strokeWidth={2} />
                <Popover
                    ref={refs.setFloating}
                    isOpen={uiState.isColorPickerActive}
                    style={floatingStyles}
                    onClick={e => e.stopPropagation()}
                    {...getFloatingProps()}
                >
                    <Stack gap='sm'>
                        <HslColorPicker onChange={e => setUiState(prev => ({ ...prev, colorPickerColor: e }))} />
                        <Button variant='accent' onClick={() => setColorSet((prev) => [
                            ...prev,
                            {
                                id: (Date.now() + Math.random()).toString(36),
                                color: `hsl(${Math.round(uiState.colorPickerColor.h)}, ${Math.round(uiState.colorPickerColor.s)}%, ${Math.round(uiState.colorPickerColor.l)}%)`
                            }
                        ])}>
                            Добавить цвет
                        </Button>
                    </Stack>
                </Popover>
            </div>
        </Stack>
    </Stack >
}
