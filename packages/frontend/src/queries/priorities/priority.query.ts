import { useQuery } from "@tanstack/react-query";
import { PrioritiesService } from "./priorities.service";

export const priorityKeys = { all: ['priorities'] as const };

export const useGetPrioritiesQuery = () => {
    return useQuery({
        queryKey: priorityKeys.all,
        staleTime: 5 * 60 * 1000,
        retry: 3,
        retryDelay: (index) => 1000 * (index * 2),

        queryFn: async () => {
            const [res] = await Promise.all([
                PrioritiesService.getAll(),
                new Promise(resolve => setTimeout(resolve, 500))
            ]);
            return res;
        }
    })
}