import { useEffect, useState } from 'react'
import { colord } from 'colord';
import Heading from '@components/ui/Heading/Heading.tsx';
import Stack from '@components/ui/Stack/Stack.tsx';
import Button from '@components/ui/Button/Button';
import ColorPicker from '@components/ui/ColorPicker/ColorPicker';
import { getLocalStorageColors, INITIAL_COLORS } from './ColorList.constants';
import stylesObj from './ColorList.module.css';

const ColorList = () => {
    const [uiState, setUiState] = useState({
        colorSet: getLocalStorageColors(),
        selectedColor: INITIAL_COLORS[0],
        colorPickerColor: {
            h: 0,
            s: 0,
            l: 0,
        },
    })

    useEffect(() => {
        localStorage.setItem('colorSet', JSON.stringify(uiState.colorSet));
    }, [uiState.colorSet])

    const onChangePickerColor = (color: string) => {
        setUiState((prev) => ({
            ...prev,
            colorPickerColor: colord(color).toHsl(),
        }))
    }

    return <Stack gap='md' >
        <Heading level={6} variant='secondary' > Цвет </Heading>
        <Stack wrap={true} direction='row' >
            {
                [...INITIAL_COLORS, ...uiState.colorSet].map((item) => (
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
                    />
                ))}

            <ColorPicker exportColor={onChangePickerColor} />
        </Stack>
        <Button
            variant='outline'
            onClick={
                () => setUiState((prev) => ({
                    ...prev,
                    colorSet: [
                        ...prev.colorSet, {
                            id: (Date.now() + Math.random()).toString(36),
                            color: `hsl(${Math.round(uiState.colorPickerColor.h)}, ${Math.round(uiState.colorPickerColor.s)}%, ${Math.round(uiState.colorPickerColor.l)}%)`
                        }
                    ]
                }))}>
            Добавить цвет
        </Button>
    </Stack >
}

export default ColorList;