import stylesObj from './Templates.module.css';
import { Outlet } from 'react-router-dom';
import Button from '@components/ui/Button/Button';
import { PillPicker } from '@components/ui/PillPicker/PillPicker';
import { TEMPLATES_ROUTES } from '@/routes/templates.routing.ts';
import { ContentHeader } from '@components/ui/ContentHeader/ContentHeader';

export const Component = () => {
    return (
        <div className={stylesObj.wrapper}>
            <ContentHeader
                title="Шаблоны и теги"
                subtitle="Готовые заготовки для задач, тегов и управление метками"
            >
                <Button variant='accent' >Создать шаблон</Button>
            </ContentHeader>
            <PillPicker items={TEMPLATES_ROUTES} />
            <div className={stylesObj.templatesGrid}>
                <Outlet />
            </div>
        </div>
    )
}
