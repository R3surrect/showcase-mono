import type Task from '@/types/Task'

export default interface TaskStore {
    tasks: Task[];
    isLoading: boolean;
    isInitialized: boolean;
    errorMessage: string | null;
    addTask: (newTask: Task) => void;
    deleteTask: (taskId: string) => void;
    updateTask: (taskId: string, updatedTask: Task) => void;
    loadTasks: () => void;
}
