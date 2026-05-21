import type { Gap } from '../_shared/system.types';
import stylesObj from './Grid.module.css';
import type { AlignItems, Columns, Heights } from './Grid.types';

interface GridProps {
    columns?: Columns;
    alignItems?: AlignItems;
    height?: Heights;
    children: React.ReactNode;
    gap?: Gap;
}

interface GridVars extends React.CSSProperties {
    '--grid-gap': string;
    '--grid-columns': number;
    '--grid-align-items': string;
    '--grid-height': string;
}

const Grid = ({
    columns = 3,
    gap = 'sm',
    alignItems = 'stretch',
    height = 'max',
    children
}: GridProps) => {
    const isFit = height === 'fit-content';

    return <div
        className={stylesObj.gridWrapper}
        style={{
            '--grid-gap': `var(--indent-${gap})`,
            '--grid-columns': columns,
            '--grid-align-items': alignItems,
            '--grid-height': isFit ? 'fit-content' : '100%'
        } as GridVars}
    >
        {children}
    </div>
}

export default Grid;
