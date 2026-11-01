import type { HeadingProps, HeadingVars } from "@/components/entities/Heading/Heading.types";
import stylesObj from "./Heading.module.css";
import clsx from "clsx";

const Heading = ({ variant = 'accent', align = 'start', weight = 'bold', level, children }: HeadingProps) => {
    const Tag: React.ElementType = `h${level}`;
    const style: HeadingVars = {
        '--heading-text-align': align,
        '--heading-text-weight': weight
    };
    
    return <Tag
        className={clsx(stylesObj.heading, stylesObj[variant])}
        style={style}
    >
        {children}
    </Tag>

}

export default Heading;
