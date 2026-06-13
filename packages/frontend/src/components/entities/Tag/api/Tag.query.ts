import { useMutation, useQuery } from '@tanstack/react-query';
import { TagsService } from './Tag.service';

export const tagsKeys = {
    all: ['tags'] as const,
};

export const useGetTagsQuery = () => {
    return useQuery({
        queryKey: tagsKeys.all,
        queryFn: async () => {
            const [res] = await Promise.all([
                TagsService.getAll(),
                new Promise(resolve => setTimeout(resolve, 500))
            ]);

            return res;
        },
        staleTime: 5 * 60 * 1000,
        retry: 3,
        retryDelay: (index) => 1000 * (index * 2),
        placeholderData: {
            success: true,
            payload: [{
                id: 0,
                label: 'Loading...',
                emoji: '⏳',
                color: { h: 0, s: 0, l: 0 },
                createdAt: new Date().toISOString()
            }]
        },
    })
}

export const useCreateTagQuery = () => {
    return useMutation()
}