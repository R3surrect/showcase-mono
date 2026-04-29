import stylesObj from './Grid.module.css';

// const GRID_VARIANTS = ['outline', 'solid', 'glass'] as const;
// type Variants = typeof GRID_VARIANTS[number];

interface GridProps {
    columns?: 2 | 3 | 4 | 5 | 6;
    // variant?: Variants;
    children: React.ReactNode;
}

export const Grid = ({ columns = 3, children }: GridProps) => {

    return <div
        className={stylesObj.gridWrapper}
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
        {children}
    </div>
}
