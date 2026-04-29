import { useState } from 'react'
import Heading from '../Heading/Heading';
import stylesObj from './ColorPicker.module.css';

const colorsList = [
    'rgb(107, 112, 66)', 'rgb(161, 93, 77)', 'rgb(181, 142, 88)',
    'rgb(95, 107, 117)', 'rgb(157, 146, 128)', 'rgb(140, 106, 62)',
    'rgb(62, 75, 52)', 'rgb(94, 75, 94)', 'rgb(199, 155, 133)',
    'rgb(62, 75, 84)', 'rgb(163, 145, 163)', 'rgb(140, 163, 161)',
    'rgb(176, 152, 113)', 'rgb(77, 51, 45)', 'rgb(122, 70, 58)',]

export const ColorPicker = () => {
    const [color, setColor] = useState(colorsList[0]);

    return <div className={stylesObj.wrapper}>
        <Heading level={6} variant='secondary'>Цвет</Heading>
        <br />
        <div className={stylesObj.colorsList}>
            {colorsList.map((item) => (
                <div
                    style={{
                        backgroundColor: `${item}`,
                        boxShadow: item === color ? `0 0 0 3px var(--neutral-0), 0 0 0 6px ${color}` : ''
                    }}
                    onClick={() => setColor(item)}
                ></div>
            ))}
        </div>
    </div>
}
