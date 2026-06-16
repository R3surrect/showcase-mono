import type { HeadingProps, HeadingVars } from "@/components/entities/Heading/Heading.types";
import stylesObj from "./Heading.module.css";
import clsx from "clsx";

const Heading = ({ variant = 'accent', align = 'start', level, children }: HeadingProps) => {
    const variantClass = stylesObj[variant];

    if (!variantClass && process.env.NODE_ENV === 'development')
        console.warn(`[UI-Kit Heading]: Класс для варианта "${variant}" не найден в Heading.module.css`)

    const Tag: React.ElementType = `h${level}`;
    return <Tag
        className={clsx(stylesObj.heading, stylesObj[variant])}
        style={{ '--heading-text-align': align } as HeadingVars}
    >
        {children}
    </Tag>

}

export default Heading;
