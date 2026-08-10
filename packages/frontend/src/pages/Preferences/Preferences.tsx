import { PillPicker } from '@/components/entities/PillPicker/PillPicker';
import { PREFERENCES_ROUTES } from '@/routes/preferences.routing';
import { Outlet } from 'react-router-dom';
import Grid from '@components/entities/Grid/Grid';
import Stack from '@components/entities/Stack/Stack';
import { ContentHeader } from '@/components/entities/ContentHeader/ContentHeader';

export const Component = () => {
    return (
        <Stack>
            <ContentHeader title='Предпочтения' subElement='Тонкая настройка вашего рабочего пространства' />
            <PillPicker items={PREFERENCES_ROUTES} />
            <Grid>
                <Outlet />
            </Grid>
        </Stack>
    )
}
