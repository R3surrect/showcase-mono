import { getTagsQueryOptions } from '@/queries/tags/tags.query';
import { getTasksQueryOptions } from '@/queries/tasks/task.query';
import { queryClient } from '@/shared/api/queryClient';
import useAuthStore from '@/store/useAuthStore';
import { redirect, type LoaderFunctionArgs } from 'react-router-dom';

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const pathname = new URL(request.url).pathname;

    await useAuthStore.getState().checkAuth();

    const authStatus = useAuthStore.getState().authData.authStatus;
    if (authStatus === 'unauthenticated') throw redirect('/auth/login');
    if (authStatus === 'authenticated') {
        await queryClient.query(getTasksQueryOptions());
        await queryClient.query(getTagsQueryOptions());
        // await queryClient.query(getNotesQueryOptions());
        
        if (pathname === '/') throw redirect('/analytics');
    };

    return null;
}
