import './BaseContainer.css';
import type { BaseContainerProps } from '@/common/components';

const BaseContainer = ({ children }: BaseContainerProps) => {
    return (
        <div className='base-container'>
            {children}
        </div>
    )
}

export default BaseContainer;