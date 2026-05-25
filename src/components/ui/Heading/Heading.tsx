import type { TextAlign } from "../_shared/system.types";
import stylesObj from "./Heading.module.css";
import clsx from "clsx";

export const VARIANT_TYPES = ['accent', 'secondary'] as const;
export const LEVEL_TYPES = [1, 2, 3, 4, 5, 6] as const;

export type Variants = typeof VARIANT_TYPES[number];
export type Levels = typeof LEVEL_TYPES[number];

export interface HeadingProps {
    variant: Variants;
    level: Levels;
    align?: TextAlign;
    children: React.ReactNode;
}

const Heading = ({ variant = 'accent', align = 'start', level, children }: HeadingProps) => {

    const variantClass = stylesObj[variant];

    if (!variantClass && process.env.NODE_ENV === 'development')
        console.warn(`[UI-Kit Heading]: Класс для варианта "${variant}" не найден в Heading.module.css`)

    const Tag: React.ElementType = `h${level}`;
    return <Tag
        className={clsx(stylesObj.heading, stylesObj[variant])}
        style={{ textAlign: align }}
    >
        {children}
    </Tag>

}

export default Heading;
