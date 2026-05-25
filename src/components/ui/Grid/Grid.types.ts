import type { ALIGN_ITEMS_TYPES, AUTO_ROWS_TYPES, COLUMN_TYPES, HEIGHT_TYPES } from "./Grid.constants";
import type { Size } from "../_shared/system.types";

export type Columns = typeof COLUMN_TYPES[number];
export type AlignItems = typeof ALIGN_ITEMS_TYPES[number];
export type Heights = typeof HEIGHT_TYPES[number];
export type AutoRows = typeof AUTO_ROWS_TYPES[number];

export interface GridProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'style' | 'className'> {
    columns?: Columns;
    alignItems?: AlignItems;
    height?: Heights;
    children: React.ReactNode;
    gap?: Size;
    autoRows?: AutoRows;
}

export interface GridVars extends React.CSSProperties {
    '--grid-gap': string;
    '--grid-columns': number;
    '--grid-align-items': string;
    '--grid-height': string;
}