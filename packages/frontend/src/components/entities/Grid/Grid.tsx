import type { GridProps, GridVars } from '@/components/entities/Grid/Grid.types';
import stylesObj from './Grid.module.css';

const Grid = ({
    columns = 3,
    gap = 'sm',
    alignItems = 'stretch',
    justifyItems = 'stretch',
    height = 'max',
    autoRows = 'min-content',
    templateColumns,
    children
}: GridProps) => {
    return <div
        className={stylesObj.gridWrapper}
        style={{
            '--grid-gap': `var(--indent-${gap})`,
            '--grid-columns': columns,
            '--grid-align-items': alignItems,
            '--grid-auto-rows': autoRows,
            '--grid-template-columns': templateColumns,
            '--grid-justify-items': justifyItems,
        } as GridVars}
        data-height={height}
    >
        {children}
    </div>
}

export default Grid;
