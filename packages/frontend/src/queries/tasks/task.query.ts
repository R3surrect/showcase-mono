import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { TasksService } from "./tasks.service";
import type { Task, TaskCreateInput, TaskDeleteInput, TaskUpdateInput } from "@showcase-mono/backend/routes/api/v1/tasks/tasks.types";
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
})

export const useGetTasksQuery = () => useQuery(getTasksQueryOptions());

export const useUpdateTaskQuery = () => {
    const queryClient = useQueryClient();
    const { pushToast } = useToast();

    return useMutation({
        onMutate: async (variables) => {
            await queryClient.cancelQueries({ queryKey: tasksKeys.all });

            queryClient.setQueryData<Task[]>(tasksKeys.all, prev =>
                prev?.map(
                    task => task.id === variables.id
                        ? { ...task, ...variables }
                        : task
                ))
        },
        mutationFn: async (data: { id: number } & TaskUpdateInput) => TasksService.updateTask(data),
        onSuccess: (data) => {
            pushToast({
                text: `Task "${data?.label}" updated`,
                type: 'popup',
                label: 'Task updated!',
                status: 'success'
            })
            return queryClient.invalidateQueries({ queryKey: tasksKeys.all })
        },
        onError: (error) => pushToast({
            text: `${error}`,
            type: 'popup',
            label: 'Task updating failed',
            status: 'error'
        }),
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
        onMutate: async (variables) => {
            await queryClient.cancelQueries({ queryKey: tasksKeys.all });

            queryClient.setQueryData<Task[]>(tasksKeys.all, prev =>
                prev?.filter(item => item.id !== variables.id))
        },
        mutationFn: async (data: TaskDeleteInput) => TasksService.deleteTask(data),
        onSuccess: (data) => {
            pushToast({
                text: `Task "${data.label}" deleted!`,
                type: 'popup',
                label: 'Task deleted',
                status: 'success'
            })
            return queryClient.invalidateQueries({ queryKey: tasksKeys.all })
        },
        onError: (error) => pushToast({
            text: `${error}`,
            type: 'popup',
            label: 'Task deleting failed',
            status: 'error'
        })
    })
}