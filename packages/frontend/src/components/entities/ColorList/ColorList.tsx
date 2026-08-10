import { useEffect, useState } from 'react'
import Heading from '@components/entities/Heading/Heading.tsx';
import Stack from '@components/entities/Stack/Stack.tsx';
import Button from '@components/entities/Button/Button';
import ColorPicker from '@components/entities/ColorPicker/ColorPicker';
import stylesObj from './ColorList.module.css';
import { getLocalStorageColors, INITIAL_COLORS } from '@/components/entities/ColorList/ColorList.constants';
import Grid from '@components/entities/Grid/Grid';
import type { ColorListProps } from './ColorList.types';
import type { ColorSet } from '../_shared/system.types';
import { colord } from 'colord';

const ColorList = ({ value, onColorChange }: ColorListProps) => {
    const [colorSet, setColorSet] = useState<ColorSet[]>(getLocalStorageColors());
    const [selectedColor, setSelectedColor] = useState(INITIAL_COLORS[0]);

    useEffect(() => {
        localStorage.setItem('colorSet', JSON.stringify(colorSet));
    }, [colorSet])

    return <Stack gap='md' >
        <Heading level={6} variant='secondary'>Цвет</Heading>
        <Grid columns={16} justifyItems='center' gap='md'>
            <ColorPicker
                exportColor={(color) => onColorChange(color)}
                color={value}
            />
            {
                [...INITIAL_COLORS, ...colorSet].map((item) => {
                    return (
                        <div
                            key={item.id}
                            className={stylesObj.colorElement}
                            onClick={() => {
                                onColorChange(item.color);
                                setSelectedColor(item);
                            }}
                            style={{
                                backgroundColor: colord(item.color).toHslString(),
                                boxShadow: item.id === selectedColor.id
                                    ? `0 0 0 3px var(--neutral-0), 0 0 0 6px ${colord(selectedColor.color).toHslString()}`
                                    : ''
                            }}
                        />
                    )
                })
            }
        </Grid>
        <Button
            variant='outline'
            width='max'
            onClick={
                () => setColorSet((prevColors: ColorSet[]) => [
                    ...prevColors,
                    {
                        id: crypto.randomUUID(),
                        color: {
                            h: value.h,
                            s: value.s,
                            l: value.l
                        }
                    }]
                )
            }
        >Добавить цвет</Button>
    </Stack >
}

export default ColorList;