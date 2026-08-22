import { getTasksQueryOptions } from '@/queries/tasks/task.query';
import { queryClient } from '@/shared/api/queryClient';
import useAuthStore from '@/store/useAuthStore';

export const loader = async () => {
    const { authData } = useAuthStore.getState();

    if (useAuthStore.getState().authData.authStatus === 'unknown') await useAuthStore.getState().checkAuth();
    if (authData.authStatus === 'authenticated') {
        await queryClient.ensureQueryData(getTasksQueryOptions());
    };

    return null;
}
