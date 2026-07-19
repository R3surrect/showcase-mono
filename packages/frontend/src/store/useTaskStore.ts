import { create } from "zustand";
import type Task from "@/types/Task";
import type TaskStore from '@/interfaces/TaskStore';

const useTaskStore = create<TaskStore>((set, get) => ({

    tasks: [],
    isLoading: false,
    isInitialized: false,
    errorMessage: null,

    // TODO Отработать Рандомный id

    addTask: (newTask: Task) => set(
        prev => ({
            tasks: [...prev.tasks, { ...newTask, id: (Date.now() + Math.random()).toString(36) }]
        })
    ),

    deleteTask: (taskId: string) => set(
        prev => ({
            tasks: prev.tasks.filter(task => task.id !== taskId)
        })
    ),

    updateTask: (taskId: string, updatedTask: Task) => set(
        prev => ({
            tasks: prev.tasks.map(task => task.id === taskId ? updatedTask : task)
        })
    ),

    loadTasks: async () => {
        if (get().isLoading) return;
        set({ isLoading: true });

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}:${import.meta.env.VITE_BACKEND_API_PORT}/api/v1/scheduler`,
                {
                    method: "GET",
                    credentials: 'include',
                    headers: {
                        'X-Requested-By': 'XMLHttpRequest'
                    },
                });

            if (!response.ok) {
                console.log('not ok due err')
                throw new Error(response.status.toString());
            };

            const tasks = await response.json();
            console.log('tasks: ', tasks);

            set({
                tasks,
                isLoading: false,
                errorMessage: null,
            })
        }

        catch (error: unknown) {
            const message = (error instanceof Error)
                ? error.message
                : 'Unexpected error type';

            set({
                errorMessage: message,
                isLoading: false,
            })
        }

    }
}))

export default useTaskStore;
