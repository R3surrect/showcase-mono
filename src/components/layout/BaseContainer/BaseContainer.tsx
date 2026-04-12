import stylesObj from './BaseContainer.module.css';

const BaseContainer = ({ children }: React.PropsWithChildren) => {
    return (
        <div className={stylesObj.baseContainer}>
            {children}
        </div>
    )
}

export default BaseContainer;
