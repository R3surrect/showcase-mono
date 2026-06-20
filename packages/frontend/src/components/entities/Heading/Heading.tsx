import type { HeadingProps, HeadingVars } from "@/components/entities/Heading/Heading.types";
import stylesObj from "./Heading.module.css";
import clsx from "clsx";

const Heading = ({ variant = 'accent', align = 'start', weight = 'regular', level, children }: HeadingProps) => {
    const Tag: React.ElementType = `h${level}`;

    return <Tag
        className={clsx(stylesObj.heading, stylesObj[variant])}
        style={{
            '--heading-text-align': align,
            '--heading-text-weight': weight
        } as HeadingVars}
    >
        {children}
    </Tag>

}

export default Heading;
