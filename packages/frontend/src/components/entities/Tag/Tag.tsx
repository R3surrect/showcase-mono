import { useId } from 'react';
import type { ColorVariable, TagProps } from '@/components/entities/Tag/Tag.types';
import stylesObj from './Tag.module.css';
import { getHslString } from '@components/entities/ColorList/ColorList.constants';
import clsx from 'clsx';

const Tag = ({ label, color, id, width = 'fit', variant = 'default', ...props }: TagProps) => {
    const genId = useId();

    return <div
        id={id ? id.toString() : genId}
        className={clsx(stylesObj.tag, stylesObj[variant])}
        data-width={width}
        style={{ '--tag-color': getHslString(color) } as ColorVariable}
        {...props}
    >
        <span>{label}</span>
    </div>
}

export default Tag;