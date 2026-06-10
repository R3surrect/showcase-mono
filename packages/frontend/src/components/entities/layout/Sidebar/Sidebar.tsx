import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { BarChart3, CalendarDays, StickyNote, FolderOpen, Heart, LayoutTemplate, Settings } from 'lucide-react';
import stylesObj from './Sidebar.module.css';
import logo from '@/assets/svg/logo.svg'
import Heading from '@/components/entities/Heading/Heading';

const Sidebar: React.FC = () => {

    const menuItems = [
        { id: 0, label: 'Аналитика', path: '/analytics', icon: BarChart3 },
        { id: 1, label: 'Планировщик', path: '/scheduler', icon: CalendarDays },
        { id: 2, label: 'Шаблоны', path: '/templates', icon: LayoutTemplate },
        { id: 3, label: 'Заметки', path: '/notes', icon: StickyNote },
        { id: 4, label: 'Проекты', path: '/projects', icon: FolderOpen },
        { id: 5, label: 'Избранное', path: '/favorites', icon: Heart },
        { id: 6, label: 'Настройки', path: '/preferences', icon: Settings }
    ];

    return (
        <div className={stylesObj.menu} aria-label='Navigation'>
            <div className={stylesObj.logo}>
                <img src={logo} alt='Logo' height={36} width={36} />
                <Heading variant='accent' level={2}>IPlanify</Heading>
            </div>
            <nav>
                <ul className={stylesObj.list}>
                    {
                        menuItems.map(({ id, label, path, icon: Icon }) => (
                            <li key={id}>
                                <NavLink to={path}
                                    className={({ isActive }) => clsx(stylesObj.link, isActive ? stylesObj.linkActive : '')}
                                >
                                    {({ isActive }) => (
                                        <>
                                            <Icon size={20} strokeWidth={2} color={isActive
                                                ? 'var(--link-active)'
                                                : 'var(--link-inactive)'
                                            } />

                                            <span className={stylesObj.label}>{label}</span>
                                        </>
                                    )}
                                </NavLink>
                            </li>
                        ))
                    }
                </ul>
            </nav>
        </div>
    )
}

export default Sidebar;
