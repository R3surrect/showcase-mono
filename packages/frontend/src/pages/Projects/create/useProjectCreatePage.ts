import { DEFAULT_COLOR } from "@/components/entities/ColorList/ColorList.constants";
import useToast from "@/components/entities/Toast/Toast.hook";
import { useGetPrioritiesQuery } from "@/queries/priorities/priority.query";
import { useCreateProjectQuery } from "@/queries/projects/projects.query";
import { useGetStatusesQuery } from "@/queries/statuses/statuses.query";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ProjectCreateInput } from "@showcase-mono/backend/routes/api/v1/projects/projects.types";
import { projectCreateInputValidation } from "@showcase-mono/backend/routes/api/v1/projects/validations/project.create";
import { useState } from "react";
import { useForm, type SubmitErrorHandler } from "react-hook-form";

export const useProjectCreatePage = () => {
    const [selectedEmoji, setSelectedEmoji] = useState('');

    const { data: priorityData, isLoading: isPrioritiesLoading } = useGetPrioritiesQuery();
    const { data: statusesData, isLoading: isStatusesLoading } = useGetStatusesQuery('project');
    const { mutate: createProject, isPending: isProjectsPending } = useCreateProjectQuery();
    const { pushToast, clearToasts } = useToast();

    const priorities = priorityData || [];
    const statuses = statusesData || [];

    const { register, handleSubmit, control, formState: { isSubmitting } } = useForm({
        resolver: zodResolver(projectCreateInputValidation),
        mode: 'onBlur',
        defaultValues: { color: DEFAULT_COLOR.color }
    });

    const onSubmit = (data: ProjectCreateInput) => {
        clearToasts();
        createProject({ ...data, color: data.color });

        pushToast({
            text: `Project ${data.label} created`,
            type: 'popup',
            label: 'Created',
            status: 'success'
        });
    }

    const onError: SubmitErrorHandler<ProjectCreateInput> = (errors) => {
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
        onSubmit,
        onError,
        handleSubmit,
        selectedEmoji,
        setSelectedEmoji,
        register,
        control,
        isPrioritiesLoading,
        priorities,
        isStatusesLoading,
        statuses,
        isProjectsPending,
        isSubmitting
    }
}