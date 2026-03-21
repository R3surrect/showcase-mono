import styledObj from "./Heading.module.css";
import clsx from "clsx";

interface HeadingProps {
    variant: 'accent';
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    subtitle?: string;
    children: React.ReactNode;
}

const variantStyles = {
    accent: styledObj.accent
}

const Heading = ({ variant = 'accent', level = 1, subtitle, children }: HeadingProps) => {
    const Tag: React.ElementType = `h${level}`;

    return <div className={styledObj.wrapper}>    
        <Tag className={clsx(styledObj.heading, variantStyles[variant])}>{children}</Tag>
        {subtitle && <span className={styledObj.subtitle}>{subtitle}</span>}
    </div>
}

export default Heading;
