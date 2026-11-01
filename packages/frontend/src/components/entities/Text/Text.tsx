import type { ElementType } from 'react';
import stylesObj from './Text.module.css'
import type { TextProps, TextVars } from '@/components/entities/Text/Text.types';

const Text = <T extends ElementType = 'p'>({
    as,
    weight = 'bolder',
    color = 'var(--cold-blue-gray-400)',
    size = 6,
    children,
    align = 'start',
    truncate,
    wrap,
    ...props
}: TextProps<T>) => {
    const Tag = as || 'p';
    const style: TextVars = {
        textAlign: align,
        '--text-color': color,
        "--text-size": String(size),
        "--text-weight": Number(weight),
    };
    return (
        <Tag
            className={stylesObj.text}
            data-size={size}
            data-weight={weight}
            data-truncate={truncate}
            data-wrap={wrap}
            style={style}
            {...props}
        >
            {children}
        </Tag >
    )
}

export default Text;