import { useQuery } from "@tanstack/react-query";
import { ProjectService } from "./ProjectCard.service";

export const projectsKeys = { all: ['projects'] as const }

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
    })
}