import type BaseProps from '@/interfaces/BaseProps';
import './Surface.css';

const Surface: React.FC<BaseProps> = ({ children, className }) => {
    return (
        <div className={`surface ${className || ''}`}>
            {children}
        </div>
    )
}

export default Surface;