import { PillPicker } from '@/components/entities/PillPicker/PillPicker';
import { Outlet } from 'react-router-dom';
import { FAVORITES_ROUTES } from '@/routes/favorites.routing';

export const Component = () => {
    return (
        <div>
            <PillPicker items={FAVORITES_ROUTES}/>
            <main>
                <Outlet />
            </main>
        </div>
    )
}
