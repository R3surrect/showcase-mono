import { useState } from 'react'
import Heading from '@components/ui/Heading/Heading.tsx';
import Stack from '@components/ui/Stack/Stack.tsx';
import stylesObj from './ColorPicker.module.css';
import { LucidePipette } from 'lucide-react';
import Button from '@components/ui/Button/Button';
import { HexColorPicker } from 'react-colorful'
const colorsList: {
    id: string;
    color: string;
}[] = [
        { id: '1', color: 'rgb(107, 112, 66)' },
        { id: '3', color: 'rgb(161, 93, 77)' },
        { id: '4', color: 'rgb(181, 142, 88)' },
        { id: '5', color: 'rgb(95, 107, 117)' },
        { id: '6', color: 'rgb(157, 146, 128)' },
        { id: '7', color: 'rgb(140, 106, 62)' },
        { id: '8', color: 'rgb(62, 75, 52)' },
        { id: '9', color: 'rgb(94, 75, 94)' },
        { id: '0', color: 'rgb(199, 155, 133)' },
        { id: '11', color: 'rgb(62, 75, 84)' },
        { id: '13', color: 'rgb(163, 145, 163)' },
        { id: '14', color: 'rgb(140, 163, 161)' },
        { id: '15', color: 'rgb(176, 152, 113)' },
        { id: '16', color: 'rgb(77, 51, 45)' },
        { id: '17', color: 'rgb(122, 70, 58)' },
    ]

export const ColorPicker = () => {
    const [selectedColor, setSelectedColor] = useState(colorsList[0]);
    const [isColorPickerActive, setIsColorPickerActive] = useState(false);

    return <div className={stylesObj.wrapper}>
        <Heading level={6} variant='secondary'>Цвет</Heading>
        <br />
        <Stack wrap={true} direction='row'>
            {colorsList.map((item) => (
                <div
                    key={item.id}
                    className={stylesObj.colorElement}
                    onClick={() => setSelectedColor(item)}
                    style={{
                        backgroundColor: `${item.color}`,
                        boxShadow: item === selectedColor ? `0 0 0 3px var(--neutral-0), 0 0 0 6px ${selectedColor.color}` : ''
                    }}
                ></div>
            ))}
            <div className={stylesObj.colorPipette}>
                <LucidePipette width={24} height={24} stroke='var(--warm-green-700)' strokeWidth={2} />
                {isColorPickerActive && <HexColorPicker />}
            </div>
            <Button variant='outline'>Добавить цвет</Button>
        </Stack>
    </div>
}
