import { useQuery } from "@tanstack/react-query";
import { StatusesService } from "./statuses.service";
import type { Statuses } from "@showcase-mono/backend/routes/api/v1/tags/statuses";

export const statusesKeys = { all: ['statuses'] as const };

export const useGetStatusesQuery = (type: Statuses) => {
    return useQuery({
        queryKey: statusesKeys.all,
        staleTime: 5 * 60 * 1000,
        retry: 3,
        retryDelay: (index) => 1000 * (index * 2),

        queryFn: async () => {
            const [res] = await Promise.all([
                StatusesService.getAll(type),
                new Promise(resolve => setTimeout(resolve, 500))
            ]);
            return res;
        },
    });
};