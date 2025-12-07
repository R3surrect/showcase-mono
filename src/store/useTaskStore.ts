import { create } from "zustand";
import type Task from "@/types/Task";
import type TaskStore from '@/interfaces/TaskStore';
import { nanoid } from "nanoid";

const useTaskStore = create<TaskStore>((set) => ({
    tasks: [
        //* Мок
        {
            id: nanoid(),
            title: "Make Some Noise!",
            description: "Some Description",
            deadline: new Date(2026, 1, 1),
            notifyAt: new Date(2025, 12, 15),
            status: 'pending',
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    ],

    isLoading: false,
    isInitialized: false,

    addTask: (newTask: Task) => set(
        prev => ({
            tasks: [...prev.tasks, newTask]
        })
    ),

    deleteTask: (taskId: string) => set(
        prev => ({
            tasks: prev.tasks.filter(task => task.id !== taskId)
        })
    ),

    updateTask: (taskId: string, updatedTask: Task) => set(
        prev => ({
            tasks: prev.tasks.map(
                task => task.id === taskId ? updatedTask : task
            )
        })
    )
}))

export default useTaskStore;