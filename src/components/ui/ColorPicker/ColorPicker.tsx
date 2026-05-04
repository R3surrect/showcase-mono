import { useEffect, useState } from 'react'
import Heading from '@components/ui/Heading/Heading.tsx';
import Stack from '@components/ui/Stack/Stack.tsx';
import stylesObj from './ColorPicker.module.css';
import { LucidePipette } from 'lucide-react';
import Button from '@components/ui/Button/Button';
import { HslColorPicker } from 'react-colorful'
import Popover from '@/components/shared/Popover/Popover';
import { autoUpdate, flip, offset, shift, useClick, useDismiss, useFloating, useInteractions } from '@floating-ui/react';

interface ColorSet {
    id: string;
    color: string;
};

const INITIAL_COLORS: ColorSet[] = [
    { id: 'clr-66a', color: 'hsl(66, 26%, 35%)' },
    { id: 'clr-11b', color: 'hsl(11, 35%, 47%)' },
    { id: 'clr-35c', color: 'hsl(35, 36%, 53%)' },
    { id: 'clr-207d', color: 'hsl(207, 10%, 42%)' },
    { id: 'clr-37e', color: 'hsl(37, 13%, 56%)' },
    { id: 'clr-34f', color: 'hsl(34, 39%, 40%)' },
    { id: 'clr-94g', color: 'hsl(94, 18%, 25%)' },
    { id: 'clr-300h', color: 'hsl(300, 11%, 33%)' },
    { id: 'clr-20i', color: 'hsl(20, 39%, 65%)' },
    { id: 'clr-205j', color: 'hsl(205, 15%, 29%)' },
    { id: 'clr-300k', color: 'hsl(300, 9%, 60%)' },
    { id: 'clr-175l', color: 'hsl(175, 11%, 59%)' },
    { id: 'clr-37m', color: 'hsl(37, 29%, 57%)' },
    { id: 'clr-11n', color: 'hsl(11, 26%, 24%)' },
    { id: 'clr-11o', color: 'hsl(11, 36%, 35%)' },
]

const getLocalStorageColors = () => {
    try {
        return JSON.parse(localStorage.getItem('colorSet') || '[]');
    }
    catch (e) {
        console.log(e);
    }
}

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
