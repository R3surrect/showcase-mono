import useTaskStore from '@/store/useTaskStore';
import useAuthStore from '@/store/useAuthStore';

export const loader = async () => {
    const { authData } = useAuthStore.getState();
    
    if (useAuthStore.getState().authData.authStatus === 'unknown') await useAuthStore.getState().checkAuth();
    if (authData.authStatus === 'authenticated') await useTaskStore.getState().loadTasks();

    return null;
}
