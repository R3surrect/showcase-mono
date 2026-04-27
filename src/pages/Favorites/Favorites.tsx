import { PillPicker } from '@/components/ui/PillPicker/PillPicker';
import { Outlet } from 'react-router-dom';
import { FAVORITES_ROUTES } from '@/routes/favorites.routing';

export const Component = () => {
    return (
        <div>
            <PillPicker items={FAVORITES_ROUTES} initialValue='tasks' />
            <main>
                <Outlet />
            </main>
        </div>
    )
}
