import type { ElementType } from 'react';
import stylesObj from './Text.module.css'
import type { TextProps, TextVars } from '@/components/entities/Text/Text.types';

const Text = <T extends ElementType = 'p'>({
    as,
    weight = 'regular',
    color = 'var(--neutral-850)',
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
            data-weight={weight}
            style={{
                textAlign: align,
                '--text-color': color,
            } as TextVars}
            {...props}
        >
            {children}
        </Tag>
    )
}

export default Text;