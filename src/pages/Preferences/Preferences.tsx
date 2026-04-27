import { PillPicker } from '@/components/ui/PillPicker/PillPicker';
import stylesObj from './Preferences.module.css';
import { PREFERENCES_ROUTES } from '@/routes/preferences.routing';
import { Outlet } from 'react-router-dom';

export const Component = () => {
    return (
        <div className={stylesObj.wrapper}>
            <PillPicker items={PREFERENCES_ROUTES} initialValue='tags' />
            <div className={stylesObj.preferencesGrid}>
                <Outlet />
            </div>
        </div>
    )
}
