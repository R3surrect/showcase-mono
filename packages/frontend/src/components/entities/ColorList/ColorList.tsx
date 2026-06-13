import { useEffect, useState } from 'react'
import { colord } from 'colord';
import Heading from '@components/entities/Heading/Heading.tsx';
import Stack from '@components/entities/Stack/Stack.tsx';
import Button from '@components/entities/Button/Button';
import ColorPicker from '@components/entities/ColorPicker/ColorPicker';
import stylesObj from './ColorList.module.css';
import { getLocalStorageColors, INITIAL_COLORS } from '@/components/entities/ColorList/ColorList.constants';
import type { ColorSet } from './ColorList.types';

const ColorList = () => {
    const [colorSet, setColorSet] = useState(getLocalStorageColors());
    const [selectedColor, setSelectedColor] = useState(INITIAL_COLORS[0]);
    const [colorPickerColor, setColorPickerColor] = useState({ h: 0, s: 0, l: 0 })

    useEffect(() => {
        localStorage.setItem('colorSet', JSON.stringify(colorSet));
    }, [colorSet])

    return <Stack gap='md' >
        <input type='hidden' name='color' value={JSON.stringify({
            h: Math.round(colorPickerColor.h),
            s: Math.round(colorPickerColor.s),
            l: Math.round(colorPickerColor.l),
        })} />
        <Heading level={6} variant='secondary' > Цвет </Heading>
        <Stack wrap={true} direction='row' >
            {
                [...INITIAL_COLORS, ...colorSet].map((item) => (
                    <div
                        key={item.id}
                        className={stylesObj.colorElement}
                        onClick={() => setSelectedColor(item)}
                        style={{
                            backgroundColor: `${item.color}`,
                            boxShadow: item.id === selectedColor.id
                                ? `0 0 0 3px var(--neutral-0), 0 0 0 6px ${selectedColor.color}`
                                : ''
                        }}
                    />
                ))}

            <ColorPicker exportColor={(color) => setColorPickerColor(colord(color).toHsl())} />
        </Stack>
        <Button
            variant='outline'
            onClick={() => setColorSet((prevColors: ColorSet[]) => [...prevColors, {
                id: (Date.now() + Math.random()).toString(36),
                color: `hsl(${Math.round(colorPickerColor.h)}, ${Math.round(colorPickerColor.s)}%, ${Math.round(colorPickerColor.l)}%)`
            }])}
        >Добавить цвет</Button>
    </Stack >
}

export default ColorList;