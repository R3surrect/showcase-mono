import { LucidePipette } from 'lucide-react';
import { colord } from 'colord';
import stylesObj from './ColorPicker.module.css';
import type { ColorPickerProps } from '@/components/entities/ColorPicker/ColorPicker.types';

const ColorPicker = ({ exportColor, color }: ColorPickerProps) => {
    return <div
        className={stylesObj.colorPipette}
        style={{ boxShadow: `0 0 0 3px hsl(${color.h}, ${color.s}%, ${color.l}%)` }}
    >
        <LucidePipette
            width={20}
            height={20}
            stroke='var(--monochrome-400)'
            strokeWidth={2}
        />

        <input
            type='color'
            value={colord(color).toHex()}
            onChange={e => {
                exportColor(colord(e.target.value).toHsl());
            }}
        />
    </div>
}

export default ColorPicker;