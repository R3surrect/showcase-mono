import { getTasksQueryOptions } from '@/queries/tasks/task.query';
import { queryClient } from '@/shared/api/queryClient';
import useAuthStore from '@/store/useAuthStore';
import { redirect } from 'react-router-dom';

export const loader = async () => {
    if (useAuthStore.getState().authData.authStatus === 'unknown') await useAuthStore.getState().checkAuth();
    const authStatus = useAuthStore.getState().authData.authStatus;
    if (authStatus === 'unauthenticated') throw redirect('/auth/login');
    if (authStatus === 'authenticated') await queryClient.query(getTasksQueryOptions());

    return null;
}
