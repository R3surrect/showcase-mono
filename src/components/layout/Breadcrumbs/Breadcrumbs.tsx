import './Breadcrumbs.css';
import { ChevronRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Breadcrumbs: React.FC = () => {
    // const mock = [
    //     { id: 1, label: 'nav_1' },
    //     { id: 2, label: 'nav_2' },
    //     { id: 3, label: 'nav_3' },
    //     { id: 4, label: 'nav_4' },
    //     { id: 5, label: 'nav_5' },
    //     { id: 6, label: 'nav_6' },
    // ];

    return (
        <nav aria-label='Breadcrumb' className="breadcrumbs-bar">
            <ol className="breadcrumbs-bar__list">
                <NavLink to='/analytics'>Аналитика</NavLink>
                <ChevronRight color='var(--neutral-500)' />
                <NavLink to='/analytics/summary'>Сводка</NavLink>
                <ChevronRight color='var(--neutral-500)' />
                <NavLink to='/analytics/summary/:date' end >01.01.2000</NavLink>
            </ol>
        </nav>
    )
}

export default Breadcrumbs;