import { useState } from 'react';
import { LucidePipette } from 'lucide-react';
import stylesObj from './ColorPicker.module.css';
import type { ColorPickerProps } from '@/components/entities/ColorPicker/ColorPicker.types';

const ColorPicker = ({ exportColor }: ColorPickerProps) => {
    const [color, setColor] = useState('');

    return <div
        className={stylesObj.colorPipette}
        style={{
            boxShadow: `0 0 0 2px ${color}`,
        }}
    >
        <LucidePipette
            width={20}
            height={20}
            stroke='var(--monochrome-400)'
            strokeWidth={2}
        />

        <input
            type='color'
            value={color}
            onChange={e => {
                setColor(e.target.value);
                exportColor(e.target.value);
            }}
        />
    </div>
}

export default ColorPicker;