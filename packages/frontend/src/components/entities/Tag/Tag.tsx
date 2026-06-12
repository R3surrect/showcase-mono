import type { ColorVariable, TagProps } from '@/components/entities/Tag/Tag.types';
import stylesObj from './Tag.module.css';

const Tag = ({ label, emoji, color, id, ...props }: TagProps) => {
    return <div
        id={id.toString()}
        className={stylesObj.tag}
        style={{ '--tag-color': `hsl(${color.h}, ${color.s}%, ${color.l}%)` } as ColorVariable}
        {...props}
    >
        {emoji}
        <p>{label}</p>
    </div>
}

export default Tag;