import type SurfaceProps from '@common/surface';
import './Surface.css';

const Surface: React.FC<SurfaceProps> = ({ children, className }) => {
    return (
        <div className={`surface ${className || ''}`}>
            {children}
        </div>
    )
}

export default Surface;