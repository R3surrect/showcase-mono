import stylesObj from './Header.module.css';

const Header = () => {
    const date = new Date();
    const day = date.toLocaleString('ru-RU', { weekday: 'long' });
    const fullDay = day.charAt(0).toUpperCase() + day.slice(1);
    const fullDate = date.toLocaleString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }).replace(' г.', '');

    return (
        <div className={stylesObj.header}>
            <div className={stylesObj.content}>
                CONTENT
            </div>
            <div className={stylesObj.date}>
                <b>{fullDay}</b>
                <span>{fullDate}</span>
            </div>
            <div className={stylesObj.profile}>
                PROFILE
            </div>
        </div>
    )
}

export default Header;
