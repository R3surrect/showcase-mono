import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Project, ProjectCreateInput, ProjectUpdateInput } from "@showcase-mono/backend/routes/api/v1/projects/projects.types";
import { ProjectsService } from "./projects.service";
import useToast from "@/components/entities/Toast/Toast.hook";

export const projectsKeys = { all: ['projects'] as const };

export const useGetProjectsQuery = () => {
    return useQuery({
        queryKey: projectsKeys.all,
        staleTime: 5 * 60 * 1000,
        retry: 3,
        retryDelay: (index) => 1000 * (index * 2),

        queryFn: async () => {
            const [res] = await Promise.all([
                ProjectsService.getAll(),
                new Promise(resolve => setTimeout(resolve, 500))
            ]);
            return res;
        },
        select: projects => projects.toSorted((a, b) =>
            Number(b.isPinned) - Number(a.isPinned)
            || +new Date(b.createdAt) - +new Date(a.createdAt)
            || a.id - b.id
        )
    });
};

export const useUpdateProjectsQuery = () => {
    const queryClient = useQueryClient();
    const { pushToast } = useToast();

    return useMutation({
        onMutate: async (variables) => {
            await queryClient.cancelQueries({ queryKey: projectsKeys.all });

            queryClient.setQueryData<Project[]>(projectsKeys.all, prev =>
                prev?.map(
                    project => project.id === variables.id
                        ? { ...project, ...variables }
                        : project
                ))
        },
        mutationFn: async (data: ProjectUpdateInput) => ProjectsService.updateProject(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: projectsKeys.all }),
        onError: (error) => pushToast({
            text: `${error}`,
            type: 'popup',
            label: 'Project updating failed',
            status: 'error'
        }),
    });
}

export const useCreateProjectQuery = () => {
    const queryClient = useQueryClient();
    const { pushToast } = useToast();

    return useMutation({
        mutationFn: async (newProject: ProjectCreateInput) => await ProjectsService.createProject(newProject),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: projectsKeys.all }),
        onError: (error) => pushToast({
            text: `${error}`,
            type: 'popup',
            label: 'Project creating failed',
            status: 'error'
        })
    });
}