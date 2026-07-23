import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ProjectCreateInput, ProjectUpdateInput } from "@showcase-mono/backend/routes/api/v1/projects/projects.types";
import { ProjectService } from "./projects.service";

export const projectsKeys = { all: ['projects'] as const };

export const useGetProjectsQuery = () => {
    return useQuery({
        queryKey: projectsKeys.all,
        staleTime: 5 * 60 * 1000,
        retry: 3,
        retryDelay: (index) => 1000 * (index * 2),

        queryFn: async () => {
            const [res] = await Promise.all([
                ProjectService.getAll(),
                new Promise(resolve => setTimeout(resolve, 500))
            ]);
            return res;
        },
    });
};

export const useUpdateProjectsQuery = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: ProjectUpdateInput) => ProjectService.updateProject(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: projectsKeys.all }),
        onError: (error) => console.error('Error while updating project', error)
    });
}

export const useCreateProjectQuery = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newProject: ProjectCreateInput) => await ProjectService.createProject(newProject),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: projectsKeys.all }),
        onError: (error) => console.error('Error while creating project', error)
    });
}