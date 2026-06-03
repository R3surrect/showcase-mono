import { PillPicker } from '@/components/ui/PillPicker/PillPicker';
import { PREFERENCES_ROUTES } from '@/routes/preferences.routing';
import { Outlet } from 'react-router-dom';
import Grid from '@components/ui/Grid/Grid';
import Stack from '@components/ui/Stack/Stack';
import { ContentHeader } from '@/components/ui/ContentHeader/ContentHeader';

export const Component = () => {
    return (
        <Stack>
            <ContentHeader title='Предпочтения' subtitle='Тонкая настройка вашего рабочего пространства' />
            <PillPicker items={PREFERENCES_ROUTES} />
            <Grid>
                <Outlet />
            </Grid>
        </Stack>
    )
}
