import './Sidebar.css';
// import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { HelpCircle, LogOut, /* Moon, Bell, */ Settings, BarChart3, Calendar, StickyNote, Star, Heart, Layers } from 'lucide-react';

const Sidebar: React.FC = () => {
    const location = useLocation();
    // const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    const menuItems = [
        { id: 1, label: 'Аналитика', path: '/analytics', icon: BarChart3 },
        { id: 2, label: 'Планировщик', path: '/scheduler', icon: Calendar },
        { id: 3, label: 'Заметки', path: '/notes', icon: StickyNote },
        { id: 4, label: 'Проекты', path: '/projects', icon: Star },
        { id: 5, label: 'Избранное', path: '/favorites', icon: Heart },
        { id: 6, label: 'Шаблоны', path: '/templates', icon: Layers }
    ];

    const actionItems = [
        { id: 1, label: 'Помощь', icon: HelpCircle, action: () => { } },
        { id: 2, label: 'Настройки', icon: Settings, action: () => { } },
        { id: 3, label: 'Выход', icon: LogOut, action: () => { } }
    ];

    return (
        <aside className="sidebar">
            <nav className="sidebar__menu" aria-label='Основная навигация'>
                <ul className="sidebar__list">
                    {
                        menuItems.map(({ id, label, path, icon: Icon }) => (
                            <li key={id}>
                                <Link to={path}
                                    className={`sidebar__link ${location.pathname === path ? 'sidebar__link--active' : ''}`}
                                    aria-current={location.pathname === path ? 'page' : undefined}
                                // семантическая пометка для Вспомогательных технологий
                                >
                                    <Icon size={20} strokeWidth={3} color={location.pathname === path
                                        ? 'var(--link-active)'
                                        : 'var(--link-inactive)'
                                    }/>
                                    
                                    <span className='sidebar__label'>{label}</span>
                                </Link>
                            </li>
                        ))
                    }
                </ul>

            </nav>
            <div className="sidebar__actions">
                <ul className="sidebar__actions-list">
                    {
                        actionItems.map(({ id, label, icon: Icon, action }) => (
                            <div key={id} title={label} onClick={action} aria-label={label}>
                                <Icon size={30} strokeWidth={1.5}/>
                            </div>
                        ))
                    }
                </ul>
            </div>
        </aside>
    )
}

export default Sidebar;