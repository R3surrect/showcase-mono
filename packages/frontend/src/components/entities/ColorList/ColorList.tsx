import { useEffect, useState } from 'react'
import { colord } from 'colord';
import Heading from '@components/entities/Heading/Heading.tsx';
import Stack from '@components/entities/Stack/Stack.tsx';
import Button from '@components/entities/Button/Button';
import ColorPicker from '@components/entities/ColorPicker/ColorPicker';
import stylesObj from './ColorList.module.css';
import { getHslString, getLocalStorageColors, INITIAL_COLORS } from '@/components/entities/ColorList/ColorList.constants';
import type { ColorSet, ColorListProps } from './ColorList.types';

const ColorList = ({ ref }: ColorListProps) => {
    const [colorSet, setColorSet] = useState<ColorSet[]>(getLocalStorageColors());
    const [selectedColor, setSelectedColor] = useState(INITIAL_COLORS[0]);
    const [colorPickerColor, setColorPickerColor] = useState({ h: 0, s: 0, l: 0 })

    useEffect(() => {
        localStorage.setItem('colorSet', JSON.stringify(colorSet));
    }, [colorSet])

    return <Stack gap='md' >
        <input
            ref={ref}
            type='hidden'
            name='color'
            value={
                JSON.stringify({
                    h: colord(selectedColor.color).toHsl().h,
                    s: colord(selectedColor.color).toHsl().s,
                    l: colord(selectedColor.color).toHsl().l,
                })
            }
        />

        <Heading level={6} variant='secondary'>Цвет</Heading>
        <Stack wrap={true} direction='row'>
            {
                [...INITIAL_COLORS, ...colorSet].map((item) => {
                    return (
                        <div
                            key={item.id}
                            className={stylesObj.colorElement}
                            onClick={() => setSelectedColor(item)}
                            style={{
                                backgroundColor: getHslString(item.color),
                                boxShadow: item.id === selectedColor.id
                                    ? `0 0 0 3px var(--neutral-0), 0 0 0 6px ${getHslString(selectedColor.color)}`
                                    : ''
                            }}
                        />
                    )
                })
            }
            <ColorPicker exportColor={(color) => setColorPickerColor(color)} />
        </Stack>
        <Button
            variant='outline'
            width='max'
            onClick={
                () => setColorSet(
                    (prevColors: ColorSet[]) => [...prevColors, {
                        id: (Date.now() + Math.random()).toString(36),
                        color: {
                            h: colorPickerColor.h,
                            s: colorPickerColor.s,
                            l: colorPickerColor.l
                        }
                    }]
                )
            }
        >Добавить цвет</Button>
    </Stack >
}

export default ColorList;