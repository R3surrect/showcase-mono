import type { ElementType } from 'react';
import stylesObj from './Text.module.css'
import type { TextProps, TextVars } from '@/components/entities/Text/Text.types';

const Text = <T extends ElementType = 'p'>({
    as,
    weight = 'bolder',
    color = 'var(--monochrome-800)',
    size = 6,
    children,
    align = 'start',
    truncate,
    wrap,
    truncateAfter = 1,
    clamped = false,
    ...props
}: TextProps<T>) => {
    const Tag = as || 'p';
    const style: TextVars = {
        '--text-align': align,
        '--text-color': color,
        "--text-size": String(size),
        ...(wrap && truncate && { "--text-line-clamp": truncateAfter }),
    };
    return (
        <Tag
            className={stylesObj.text}
            data-size={size}
            data-weight={weight}
            data-truncate={truncate}
            data-wrap={wrap}
            data-clamped={clamped}
            style={style}
            {...props}
        >
            {children}
        </Tag >
    )
}

export default Text;