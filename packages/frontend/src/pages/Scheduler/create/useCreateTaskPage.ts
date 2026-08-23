import useToast from "@/components/entities/Toast/Toast.hook";
import { useGetPrioritiesQuery } from "@/queries/priorities/priority.query";
import { useGetProjectsQuery } from "@/queries/projects/projects.query";
import { useGetStatusesQuery } from "@/queries/statuses/statuses.query";
import { useCreateTaskQuery } from "@/queries/tasks/task.query";
import { zodResolver } from "@hookform/resolvers/zod";
import type { TaskCreateInput } from "@showcase-mono/backend/routes/api/v1/tasks/tasks.types";
import { taskCreateInputValidation } from "@showcase-mono/backend/routes/api/v1/tasks/validations/task.create";
import { useForm, type SubmitErrorHandler } from "react-hook-form";

export const useCreateTaskPage = (selectedDate: Date | undefined) => {
    const { pushToast, clearToasts } = useToast();
    const { mutate: createTask } = useCreateTaskQuery();

    const { register, handleSubmit, control, formState: { isSubmitting } } = useForm({
        resolver: zodResolver(taskCreateInputValidation),
        mode: 'onBlur',
        defaultValues: {
            deadline: selectedDate,
        }
    })

    const { data: projects = [], isLoading: isProjectsLoading } = useGetProjectsQuery();
    const { isLoading: isPrioritiesLoading, data: priorities = [] } = useGetPrioritiesQuery();
    const { isLoading: isStatusesLoading, data: statuses = [] } = useGetStatusesQuery('task');

    const onSubmit = (data: TaskCreateInput) => {
        clearToasts();
        createTask(data);

        pushToast({
            text: `Task ${data.label} created`,
            type: 'popup',
            label: 'Task created',
            status: 'success'
        });
    }

    const onError: SubmitErrorHandler<TaskCreateInput> = (errors) => {
        clearToasts();

        Object.entries(errors).forEach(([fieldName, error]) => {
            if (error?.message) {
                pushToast({
                    text: `${fieldName}: ${error.message}`,
                    type: 'popup',
                    label: 'Validation error',
                    status: 'error'
                });
            }
        });
    }

    return {
        register,
        handleSubmit,
        control,
        isSubmitting,
        projects,
        isProjectsLoading,
        priorities,
        isPrioritiesLoading,
        statuses,
        isStatusesLoading,
        onSubmit,
        onError,
    }
}