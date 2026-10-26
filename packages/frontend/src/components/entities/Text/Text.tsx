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
    truncate = false,
    width = 'auto',
    wrap = false,
    ...props
}: TextProps<T>) => {
    const Tag = as || 'p';
    return (
        <Tag
            className={stylesObj.text}
            data-size={size}
            data-weight={weight}
            data-truncate={truncate}
            data-wrap={wrap}
            style={{
                '--text-align': align,
                '--text-color': color,
                '--text-width': width,
            } as TextVars}
            {...props}
        >
            {children}
        </Tag>
    )
}

export default Text;