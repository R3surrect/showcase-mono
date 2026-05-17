import stylesObj from './Grid.module.css';

const COLUMN_TYPES = [1, 2, 3, 4, 5, 6] as const;
const ALIGN_ITEMS_TYPES = ['start', 'center', 'end', 'stretch'] as const;
const HEIGHT_TYPES = ['fit-content', 'max'] as const;

type Columns = typeof COLUMN_TYPES[number];
type AlignItems = typeof ALIGN_ITEMS_TYPES[number];
type Heights = typeof HEIGHT_TYPES[number];

interface GridProps {
    columns?: Columns;
    alignItems?: AlignItems;
    height?: Heights;
    children: React.ReactNode;
}

interface GridVars extends React.CSSProperties {
    '--grid-columns': number;
    '--grid-align-items': string;
    '--grid-height': string;
}

const Grid = ({ columns = 3, alignItems = 'stretch', height = 'max', children }: GridProps) => {
    const isFit = height === 'fit-content';

    return <div
        className={stylesObj.gridWrapper}
        style={{
            '--grid-columns': columns,
            '--grid-align-items': alignItems,
            '--grid-height': isFit ? 'fit-content' : '100%'
        } as GridVars}
    >
        {children}
    </div>
}

export default Grid;
