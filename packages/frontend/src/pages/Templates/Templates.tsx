import { Outlet } from 'react-router-dom';
import Button from '@components/entities/Button/Button';
import { PillPicker } from '@components/entities/PillPicker/PillPicker';
import { TEMPLATES_ROUTES } from '@/routes/templates.routing.ts';
import { ContentHeader } from '@components/entities/ContentHeader/ContentHeader';
import Stack from '@components/entities/Stack/Stack';
import Grid from '@components/entities/Grid/Grid';
import Banner from '@/components/entities/Banner/Banner';
import Text from '@/components/entities/Text/Text';

export const Component = () => {
    return (
        <Stack gap='md' wrap={true}>
            <ContentHeader
                title="Шаблоны и теги"
                subtitle="Готовые заготовки для задач, тегов и управление метками"
            >
                <Button variant='accent'>Создать шаблон</Button>
            </ContentHeader>
            <Banner variant='hint' hintId='templates-page-hint'>
                <Text weight='bold' size={6}>Как работают шаблоны:</Text>
                <Text size={6}>сохраняйте повторяющиеся настройки задач и тегов, чтобы применять их одним нажатием. Во вкладке «Теги» можно создавать и удалять метки для задач и заметок.</Text>
            </Banner >
            <PillPicker items={TEMPLATES_ROUTES} />
            <Grid columns={2}>
                <Outlet />
            </Grid>
        </Stack>
    )
}
