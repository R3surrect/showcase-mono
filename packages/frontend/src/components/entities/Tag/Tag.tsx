import type { ColorVariable, TagProps } from '@/components/entities/Tag/Tag.types';
import stylesObj from './Tag.module.css';
import { useId } from 'react';
import { getHslString } from '../ColorList/ColorList.constants';

const Tag = ({ label, color, id, ...props }: TagProps) => {
    const genId = useId();

    return <div
        id={id ? id.toString() : genId}
        className={stylesObj.tag}
        style={{ '--tag-color': getHslString(color) } as ColorVariable}
        {...props}
    >
        <p>{label}</p>
    </div>
}

export default Tag;