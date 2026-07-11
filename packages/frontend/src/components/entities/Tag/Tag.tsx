import { useId } from 'react';
import type { ColorVariable, TagProps } from '@/components/entities/Tag/Tag.types';
import stylesObj from './Tag.module.css';
import { getHslString } from '@components/entities/ColorList/ColorList.constants';

const Tag = ({ label, color, id, ...props }: TagProps) => {
    const genId = useId();

    return <div
        id={id ? id.toString() : genId}
        className={stylesObj.tag}
        style={{ '--tag-color': getHslString(color) } as ColorVariable}
        {...props}
    >
        <span>{label}</span>
    </div>
}

export default Tag;