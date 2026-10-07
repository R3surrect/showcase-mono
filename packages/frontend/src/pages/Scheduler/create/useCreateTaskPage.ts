import dayjs from "dayjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitErrorHandler } from "react-hook-form";

import useToast from "@/components/entities/Toast/Toast.hook";
import { useGetPrioritiesQuery } from "@/queries/priorities/priority.query";
import { useGetProjectsQuery } from "@/queries/projects/projects.query";
import { useGetStatusesQuery } from "@/queries/statuses/statuses.query";
import { useCreateTaskQuery } from "@/queries/tasks/task.query";
import type { TaskCreateInput, TaskCreateInputDirty } from "@showcase-mono/backend/routes/api/v1/tasks/tasks.types";
import { taskCreateInputValidation } from "@showcase-mono/backend/routes/api/v1/tasks/validations/task.create";

export const useCreateTaskPage = (selectedDate?: Date) => {
    const { pushToast, clearToasts } = useToast();
    const { mutate: createTask } = useCreateTaskQuery();

    // const defaultDeadline = dayjs(selectedDate).format('YYYY-MM-DDTHH:mm');
    // const defaultNotifyAt = dayjs(selectedDate).add(1, 'hour').format('YYYY-MM-DDTHH:mm');

    const {
        register,
        handleSubmit,
        getValues,
        control,
        formState: { isSubmitting, isDirty }
    } = useForm({
        resolver: zodResolver(taskCreateInputValidation),
        mode: 'onChange',

        defaultValues: {
            // deadline: defaultDeadline,
            // notifyAt: defaultNotifyAt,
        }
    })

    const { data: projects = [], isLoading: isProjectsLoading } = useGetProjectsQuery();
    const { isLoading: isPrioritiesLoading, data: priorities = [] } = useGetPrioritiesQuery();
    const { isLoading: isStatusesLoading, data: statuses = [] } = useGetStatusesQuery('task');

    const onValid = (data: TaskCreateInput) => {
        clearToasts();
        createTask(data);

        pushToast({
            text: `Task ${data.label} created`,
            type: 'popup',
            label: 'Task created',
            status: 'success'
        });
    }

    // const onInvalid: SubmitErrorHandler<TaskCreateInput> = (errors) => {
    const onInvalid: SubmitErrorHandler<TaskCreateInputDirty> = (errors) => {
        clearToasts();
        console.log(getValues())
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
        onValid,
        onInvalid,
        isDirty
    }
}