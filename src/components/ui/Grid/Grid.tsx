import stylesObj from './Grid.module.css';

interface GridProps {
    columns?: 2 | 3 | 4 | 5 | 6;
    children: React.ReactNode;
}

interface GridVars extends React.CSSProperties {
    '--grid-columns': number;
}

const Grid = ({ columns = 3, children }: GridProps) => {

    return <div
        className={stylesObj.gridWrapper}
        style={{ '--grid-columns': columns } as GridVars}
    >
        {children}
    </div>
}

export default Grid;
