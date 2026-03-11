import type { JSX } from "react";
import styledObj from "./Heading.module.css";
import clsx from "clsx";

interface HeadingProps {
    className?: string;
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    children: React.ReactNode;
}

const Heading = ({ level = 1, children, className = '' }: HeadingProps) => {
    const Tag = `h${level}` as keyof JSX.IntrinsicElements;

    return <Tag className={clsx(styledObj.heading, className)}>{children}</Tag>
}

export default Heading;