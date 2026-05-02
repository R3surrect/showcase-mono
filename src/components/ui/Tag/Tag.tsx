import stylesObj from './Tag.module.css';

interface TagProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style' | 'className'> {
    label: string;
    emoji: string
    color: string;
}

interface ColorVariable extends React.CSSProperties {
    '--tag-color': string;
}

export const Tag = ({ label, emoji, color, ...rest }: TagProps) => {
    return <div
        {...rest}
        className={stylesObj.tag}
        style={{ '--tag-color': `${color}` } as ColorVariable}
    >
        {emoji}
        <p>{label}</p>
    </div>
}
