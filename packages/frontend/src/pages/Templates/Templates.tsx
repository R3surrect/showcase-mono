import { Outlet } from 'react-router-dom';
import { PillPicker } from '@components/entities/PillPicker/PillPicker';
import { TEMPLATES_ROUTES } from '@/routes/templates.routing.ts';
import { ContentHeader } from '@components/entities/ContentHeader/ContentHeader';
import Stack from '@components/entities/Stack/Stack';
import Banner from '@/components/entities/Banner/Banner';
import Text from '@/components/entities/Text/Text';
import { useHintStore } from '@/store/useHintStore';
import Button from '@/components/entities/Button/Button';
import useToast from '@/components/entities/Toast/Toast.hook';
import type { ToastData } from '@/components/entities/Toast/Toast.types';

export const Component = () => {
    const hintId = 'templates-page-hint';
    const dismiss = useHintStore(store => store.dismissHint);
    const isDismissed = useHintStore(store => store.data[hintId]);

    // //! #region toastTest
    const { pushToast } = useToast();

    const toasts: ToastData[] = [
        { id: 20, label: 'Success', status: 'success', type: 'notification', text: 'Text to show' },
        { id: 21, label: 'Success', status: 'success', type: 'notification' },
        { id: 22, label: 'Info', status: 'info', type: 'notification', text: 'Text to show' },
        { id: 23, label: 'Warning', status: 'warning', type: 'notification', text: 'Text to show' },
        { id: 24, label: 'Error', status: 'error', type: 'notification', text: 'Text to show' },
        { id: 25, label: 'Error', status: 'error', type: 'notification', text: 'Text to show' },
        { id: 26, label: 'Error', status: 'error', type: 'notification', text: 'Text to show' },
        { id: 27, label: 'Error', status: 'error', type: 'notification', text: 'Text to show' },
        { id: 28, label: 'Error', status: 'error', type: 'notification', text: 'Text to show' },
        { id: 29, label: 'Error', status: 'error', type: 'notification', text: 'Text to show' },
    ]

    // toasts.map((toast) => {
    //     pushToast(toast);
    // })

    // //! #endregion 

    return (
        <Stack gap='md' wrap={true}>
            <ContentHeader
                title="Шаблоны и теги"
                subtitle="Готовые заготовки для задач, тегов и управление метками"
            >
                <Button type='button' variant='outline' onClick={() => { pushToast(toasts[2]) }}>
                    addToast
                </Button>
            </ContentHeader>
            {
                !isDismissed &&
                <Banner variant='hint' onClose={() => dismiss(hintId)} width='max'>
                    <Text weight='bold' size={6}>Как работают шаблоны:</Text>
                    <Text size={6}>сохраняйте повторяющиеся настройки задач и тегов, чтобы применять их одним нажатием. Во вкладке «Теги» можно создавать и удалять метки для задач и заметок.</Text>
                </Banner >
            }
            <PillPicker items={TEMPLATES_ROUTES} />
            <Outlet />
        </Stack>
    )
}
