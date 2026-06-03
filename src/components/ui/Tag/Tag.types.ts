export interface TagProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style' | 'className'> {
    label: string;
    emoji: string
    color: string;
}

export interface ColorVariable extends React.CSSProperties {
    '--tag-color': string;
}