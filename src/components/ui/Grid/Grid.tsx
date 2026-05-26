import stylesObj from './Grid.module.css';
import type { GridProps, GridVars } from './Grid.types';

const Grid = ({
    columns = 3,
    gap = 'sm',
    alignItems = 'stretch',
    height = 'max',
    autoRows = 'min-content',
    templateColumns,
    children
}: GridProps) => {
    const isFit = height === 'fit-content';

    return <div
        className={stylesObj.gridWrapper}
        style={{
            '--grid-gap': `var(--indent-${gap})`,
            '--grid-columns': columns,
            '--grid-align-items': alignItems,
            '--grid-height': isFit ? 'fit-content' : '100%',
            '--grid-auto-rows': autoRows,
            '--grid-template-columns': templateColumns,
        } as GridVars}
    >
        {children}
    </div>
}

export default Grid;
