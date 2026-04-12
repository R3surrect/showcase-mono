import stylesObj from "./Heading.module.css";
import clsx from "clsx";

interface HeadingProps {
    variant: 'accent';
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    subtitle?: string;
    children: React.ReactNode;
}

const variantStyles: Record<HeadingProps['variant'], string> = {
    accent: stylesObj.accent,
}

const Heading = ({ variant = 'accent', level = 1, subtitle, children }: HeadingProps) => {
    const Tag: React.ElementType = `h${level}`;

    return <div className={stylesObj.wrapper}>    
        <Tag className={clsx(stylesObj.heading, variantStyles[variant])}>{children}</Tag>
        {subtitle && <span className={stylesObj.subtitle}>{subtitle}</span>}
    </div>
}

export default Heading;
