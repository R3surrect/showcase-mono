import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { TagsService } from './Tag.service';
import type { TagCreateInput, TagDeleteInput } from '@showcase-mono/backend/routes/api/v1/templates/tags/tag.types';

export const tagsKeys = { all: ['tags'] as const };

export const useGetTagsQuery = () => {
    return useQuery({
        queryKey: tagsKeys.all,

        staleTime: 5 * 60 * 1000,
        retry: 3,
        retryDelay: (index) => 1000 * (index * 2),

        queryFn: async () => {
            const [res] = await Promise.all([
                TagsService.getAll(),
                new Promise(resolve => setTimeout(resolve, 500))
            ]);

            return res;
        },

        placeholderData: [{
            id: 0,
            label: '⏳ Loading...',
            color: { h: 0, s: 0, l: 0 },
            type: 'custom',
            category: 'system',
            createdAt: new Date().toISOString()
        }],
    })
}

export const useCreateTagQuery = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newTag: TagCreateInput) => await TagsService.createTag(newTag),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: tagsKeys.all }),
        onError: (error) => console.error('Error while creating tag', error)
    })
}

export const useDeleteTagQuery = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async (tagId: TagDeleteInput) => await TagsService.deleteTag(tagId),
        onSuccess: () => queryClient.invalidateQueries({queryKey: tagsKeys.all}),
        onError: (error) => console.error('Error while deleting tag', error)
    })
}