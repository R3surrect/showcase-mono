import { useState } from 'react';
import { LucidePipette } from 'lucide-react';
import { colord } from 'colord';
import stylesObj from './ColorPicker.module.css';
import type { ColorPickerProps } from '@/components/entities/ColorPicker/ColorPicker.types';

const ColorPicker = ({ exportColor }: ColorPickerProps) => {
    const [color, setColor] = useState({
        h: 0,
        s: 0,
        l: 0,
    });

    return <div
        className={stylesObj.colorPipette}
        style={{ boxShadow: `0 0 0 2px hsl(${color.h}, ${color.s}%, ${color.l}%)` }}
    >
        <LucidePipette
            width={20}
            height={20}
            stroke='var(--monochrome-400)'
            strokeWidth={2}
        />

        <input
            type='color'
            onChange={e => {
                const { h, s, l } = colord(e.target.value).toHsl();
                setColor({ h, s, l });
                exportColor({ h, s, l });
            }}
        />
    </div>
}

export default ColorPicker;