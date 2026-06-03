import type { ElementType } from 'react';
import stylesObj from './Text.module.css'
import { type TextProps } from './Text.types';

const Text = <T extends ElementType = 'p'> ({
    as,
    weight = 'regular',
    color = 'darkgray',
    size = 4,
    children,
    align = 'start',
    ...props
}: TextProps<T>) => {

    const Tag = as || 'p';
    return (
        <Tag
            className={stylesObj.text}
            data-size={size}
            data-color={color}
            data-weight={weight}
            style={{
                textAlign: align
            }}

            {...props}
        >
            {children}
        </Tag>
    )
}

export default Text;