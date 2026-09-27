import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { TasksService } from "./tasks.service";
import type { TaskCreateInput, TaskDeleteInput, TaskUpdateInput } from "@showcase-mono/backend/routes/api/v1/tasks/tasks.types";
import useToast from "@/components/entities/Toast/Toast.hook";

export const tasksKeys = { all: ['tasks'] as const };

export const getTasksQueryOptions = () => queryOptions({
    queryKey: tasksKeys.all,
    staleTime: 5 * 60 * 1000,
    retry: 3,
    retryDelay: (index) => 1000 * (index * 2),
    queryFn: async () => {
        const [res] = await Promise.all([
            TasksService.getAll(),
            new Promise(resolve => setTimeout(resolve, 500))
        ]);
        return res;
    },
    select: data => data.filter(task => !task.isArchived)
})

export const useGetTasksQuery = () => useQuery(getTasksQueryOptions());

export const useUpdateTaskQuery = () => {
    const queryClient = useQueryClient();
    const { pushToast } = useToast();

    return useMutation({
        mutationFn: async (data: TaskUpdateInput) => TasksService.updateTask(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: tasksKeys.all }),
        onError: (error) => pushToast({
            text: `${error}`,
            type: 'popup',
            label: 'Task updating failed',
            status: 'error'
        })
    })
};

export const useCreateTaskQuery = () => {
    const queryClient = useQueryClient();
    const { pushToast } = useToast();

    return useMutation({
        mutationFn: async (data: TaskCreateInput) => await TasksService.createTask(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: tasksKeys.all }),
        onError: (error) => pushToast({
            text: `${error}`,
            type: 'popup',
            label: 'Task creating failed',
            status: 'error'
        })
    });
}

export const useDeleteTaskQuery = () => {
    const queryClient = useQueryClient();
    const { pushToast } = useToast();

    return useMutation({
        mutationFn: async (data: TaskDeleteInput) => TasksService.deleteTask(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: tasksKeys.all }),
        onError: (error) => pushToast({
            text: `${error}`,
            type: 'popup',
            label: 'Task deleting failed',
            status: 'error'
        })
    })
}