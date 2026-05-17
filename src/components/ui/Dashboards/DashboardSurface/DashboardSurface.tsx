import Surface from '@components/ui/Surface/Surface';
import stylesObj from './DashboardSurface.module.css'

type DashboardSurfaceProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'style' | 'className'>;

const DashboardSurface = ({ children, ...props }: DashboardSurfaceProps) => {
    return <div className={stylesObj.dashboardSurfaceWrapper} {...props}>
        <Surface variant='solid' height="fit-content">
            {children}
        </Surface>
    </div >
}

export default DashboardSurface;