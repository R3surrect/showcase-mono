import type { AUTO_ROWS_TYPES, COLUMN_TYPES,  } from "./Grid.constants";
import type { BoxAlignment, Heights, Size } from "@/components/ui/_shared/system.types";

export type Columns = typeof COLUMN_TYPES[number];
export type AutoRows = typeof AUTO_ROWS_TYPES[number];

export interface GridProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'style' | 'className'> {
    columns?: Columns;
    alignItems?: BoxAlignment;
    height?: Heights;
    children: React.ReactNode;
    gap?: Size;
    autoRows?: AutoRows;
    templateColumns?: string;
}

export interface GridVars extends React.CSSProperties {
    '--grid-gap': string;
    '--grid-columns': number;
    '--grid-align-items': string;
    '--grid-height': string;
    '--grid-template-columns': string;
}