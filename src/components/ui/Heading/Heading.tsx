import stylesObj from "./Heading.module.css";
import clsx from "clsx";

export interface HeadingProps {
    variant: 'accent' | 'secondary';
    level: 1 | 2 | 3 | 4 | 5 | 6;
    subtitle?: string;
    children: React.ReactNode;
}

const variantStyles: Record<HeadingProps['variant'], {
    headingClass: string, subtitleClass: string
}> = {
    accent: {
        headingClass: stylesObj.accent,
        subtitleClass: stylesObj.subtitleAccent
    },
    secondary: {
        headingClass: stylesObj.secondary,
        subtitleClass: stylesObj.subtitleSecondary
    },
}

const Heading = ({ variant = 'accent', level, subtitle, children }: HeadingProps) => {
    const { headingClass, subtitleClass } = variantStyles[variant];

    const Tag: React.ElementType = `h${level}`;
    const headingElement = <Tag className={clsx(stylesObj.heading, headingClass)}>{children}</Tag>

    if (!subtitle) return headingElement;

    return <div className={subtitle ? stylesObj.headingWrapper : undefined}>
        {headingElement}
        {subtitle && <span className={
            clsx(
                stylesObj.subtitle,
                subtitleClass
            )}
        >
            {subtitle}</span>
        }
    </div>

}

export default Heading;
