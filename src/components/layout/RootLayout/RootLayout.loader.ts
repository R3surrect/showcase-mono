import useTaskStore from '@/store/useTaskStore';
import useAuthStore from '@/store/useAuthStore';

export const loader = async () => {

    if (useAuthStore.getState().authData.authStatus === 'unknown')
        await useAuthStore.getState().checkAuth();

    const { authData } = useAuthStore.getState();

    if (
        authData.authStatus === 'authenticated'
    ) {
        console.log('tasks loading')
        await useTaskStore.getState().loadTasks()
    };

    return null;
}
