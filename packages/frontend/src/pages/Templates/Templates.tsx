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
import { useState } from 'react';

export const Component = () => {
    const hintId = 'templates-page-hint';
    const dismiss = useHintStore(store => store.dismissHint);
    const isDismissed = useHintStore(store => store.data[hintId]);

    const [counter, setCounter] = useState(0);

    //#region toastTest
    const { pushToast } = useToast();

    const toasts: ToastData[] = [
        {
            id: 20,
            label: 'Success',
            status: 'success',
            type: 'popup',
            text: 'Text to show'
        },
        {
            id: 21,
            label: 'Success',
            status: 'success',
            type: 'popup'
        },
        {
            id: 22,
            label: 'Info',
            status: 'info',
            type: 'popup',
            text: 'Text to show'
        },
        {
            id: 23,
            label: 'Warning',
            status: 'warning',
            type: 'popup',
            text: 'Text to show'
        },
        {
            id: 24,
            label: 'Error',
            status: 'error',
            type: 'popup',
            text: 'Text to show'
        },
        {
            id: 25,
            label: 'Attention',
            status: 'warning',
            type: 'dialog',
            text: 'Text to show',
            confirmLabel: 'Confirm',
            denyLabel: 'Cancel',
            onConfirm: () => console.log('Confirm'),
            onDeny: () => console.log('Deny')
        },
        {
            id: 29,
            label: 'Error',
            status: 'error',
            type: 'dialog',
            text: 'Text to show',
            confirmLabel: 'Confirm',
            denyLabel: 'Cancel',
            onConfirm: () => console.log('Confirm'),
            onDeny: () => console.log('Deny')
        },
    ]
    //#endregion 

    return (
        <Stack gap='md' wrap={true}>
            <ContentHeader
                title="Шаблоны и теги"
                subtitle="Готовые заготовки для задач, тегов и управление метками"
            >
                <Button type='button' variant='outline' onClick={() => { pushToast(toasts[counter]); setCounter(counter + 1) }}>
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
