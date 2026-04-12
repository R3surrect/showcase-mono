import stylesObj from './Header.module.css';

const Header = () => {
    return (
        <div className={stylesObj.header}>
            <div className={stylesObj.content}>
                CONTENT
            </div>
            <div className={stylesObj.profile}>
                PROFILE
            </div>
        </div>
    )
}

export default Header;
