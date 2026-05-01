import { PillPicker } from '@/components/ui/PillPicker/PillPicker';
import { PREFERENCES_ROUTES } from '@/routes/preferences.routing';
import { Outlet } from 'react-router-dom';
import Grid from '@components/ui/Grid/Grid';
import Stack from '@components/ui/Stack/Stack';

export const Component = () => {
    return (
        <Stack>
            <PillPicker items={PREFERENCES_ROUTES} />
            <Grid>
                <Outlet />
            </Grid>
        </Stack>
    )
}
