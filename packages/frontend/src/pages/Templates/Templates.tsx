import { Outlet } from 'react-router-dom';
import Button from '@components/entities/Button/Button';
import { PillPicker } from '@components/entities/PillPicker/PillPicker';
import { TEMPLATES_ROUTES } from '@/routes/templates.routing.ts';
import { ContentHeader } from '@components/entities/ContentHeader/ContentHeader';
import Stack from '@components/entities/Stack/Stack';
import Grid from '@components/entities/Grid/Grid';

export const Component = () => {
    return (
        <Stack gap='lg' wrap={true}>
            <ContentHeader
                title="Шаблоны и теги"
                subtitle="Готовые заготовки для задач, тегов и управление метками"
            >
                <Button variant='accent'>Создать шаблон</Button>
            </ContentHeader>
            <PillPicker items={TEMPLATES_ROUTES} />
            <Grid columns={2}>
                <Outlet />
            </Grid>
        </Stack>
    )
}
