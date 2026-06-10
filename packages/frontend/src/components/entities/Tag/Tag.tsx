import type { ColorVariable, TagProps } from '@/components/entities/ui/Tag/Tag.types';
import stylesObj from './Tag.module.css';

const Tag = ({ label, emoji, color, ...props }: TagProps) => {
    return <div
        className={stylesObj.tag}
        style={{ '--tag-color': `${color}` } as ColorVariable}
        {...props}
    >
        {emoji}
        <p>{label}</p>
    </div>
}

export default Tag;