import useTaskStore from '@/store/useTaskStore';
import useAuthStore from '@/store/useAuthStore';

export const loader = async () => {

    const { checkAuth } = useAuthStore.getState();
    const { loadTasks } = useTaskStore.getState();

    if (useAuthStore.getState().authData.authStatus === 'unknown') await checkAuth();

    const { authData } = useAuthStore.getState();
    // const { tasks, isLoading: isTasksLoading } = useTaskStore.getState();

    if (
        authData.authStatus === 'authenticated'
        // && !isTasksLoading 
        // && tasks.length === 0
    ) {
        console.log('tasks loading')
        await loadTasks()
    };

    return null;
}
