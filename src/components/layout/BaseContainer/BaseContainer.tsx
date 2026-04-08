import './BaseContainer.css';

const BaseContainer = ({ children }: React.PropsWithChildren) => {
    return (
        <div className='base-container'>
            {children}
        </div>
    )
}

export default BaseContainer;