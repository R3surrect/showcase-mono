import type { AUTO_ROWS_TYPES, COLUMN_TYPES, } from "./Grid.constants";
import type { BoxAlignment, AxisSizeVariations, Size, ResponsiveObj } from "@/components/entities/_shared/system.types";

export type Columns = typeof COLUMN_TYPES[number];
export type AutoRows = typeof AUTO_ROWS_TYPES[number];

export interface GridProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'style' | 'className'> {
    columns?: ResponsiveObj<number>;
    alignItems?: BoxAlignment;
    justifyItems?: BoxAlignment;
    height?: AxisSizeVariations;
    children: React.ReactNode;
    gap?: Size;
    autoRows?: AutoRows;
    templateColumns?: string;
}

export interface GridVars extends React.CSSProperties {
    '--grid-gap': string;
    '--grid-columns': Columns;
    '--grid-align-items': string;
    '--grid-template-columns': string;
    '--grid-justify-items': string;
    '--grid-template-columns-md'?: number;
    '--grid-template-columns-lg'?: number;
}