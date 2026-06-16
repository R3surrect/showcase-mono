import type { TextAlign } from "../_shared/system.types";
import type { LEVEL_TYPES, VARIANT_TYPES } from "./Heading.constants";

export type Variants = typeof VARIANT_TYPES[number];
export type Levels = typeof LEVEL_TYPES[number];

export interface HeadingProps {
    variant: Variants;
    level: Levels;
    align?: TextAlign;
    children: React.ReactNode;
}

export interface HeadingVars extends React.CSSProperties {
    '--heading-text-align': string;
}