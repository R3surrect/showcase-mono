import stylesObj from './Breadcrumbs.module.css';
import { ChevronRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Breadcrumbs: React.FC = () => {

    return (
        <nav aria-label='Breadcrumb' className={stylesObj.bar}>
            <ol className={stylesObj.list}>
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
