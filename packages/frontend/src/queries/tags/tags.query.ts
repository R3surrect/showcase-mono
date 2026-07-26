import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { TagCreateInput, TagDeleteInput } from '@showcase-mono/backend/routes/api/v1/templates/tags/tag.types';
import { CategoriesService, TagsService } from './tags.service';
import useToast from '@/components/entities/Toast/Toast.hook';

export const tagsKeys = { all: ['tags'] as const };
export const categoriesKeys = { all: ['categories'] as const };

export const useGetTagsQuery = () => {
    const { pushToast } = useToast();

    return useQuery({
        queryKey: tagsKeys.all,
        staleTime: 5 * 60 * 1000,
        retry: 3,
        retryDelay: (index) => 1000 * (index * 2),

        queryFn: async () => {
            try {
                const [res] = await Promise.all([
                    TagsService.getAll(),
                    new Promise(resolve => setTimeout(resolve, 500))
                ]);

                return res;
            } catch (error) {
                pushToast({
                    label: `Pulling tags failed`,
                    status: 'error',
                    type: 'popup',
                    text: `${error instanceof Error ? error.message : 'Unknown error'}`
                });

                throw error;
            }
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

export const useGetCategoriesQuery = () => {
    const { pushToast } = useToast();

    return useQuery({
        queryKey: categoriesKeys.all,
        staleTime: 5 * 60 * 1000,
        retry: 3,
        retryDelay: (index) => 1000 * (index * 2),
        queryFn: async () => {
            try {
                const res = await CategoriesService.getAll();
                return res;
            } catch (error) {
                pushToast({
                    label: `Pulling categories failed`,
                    status: 'error',
                    type: 'popup',
                    text: `${error instanceof Error ? error.message : 'Unknown error'}`
                });

                throw error;
            }
        }
    })
}

export const useCreateTagQuery = () => {
    const { pushToast } = useToast();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newTag: TagCreateInput) => await TagsService.createTag(newTag),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: tagsKeys.all });
            queryClient.invalidateQueries({ queryKey: categoriesKeys.all });
        },
        onError: (error) => pushToast({
            label: 'Creating failed',
            status: 'error',
            type: 'popup',
            text: `${error instanceof Error ? error.message : 'Unknown error'}`
        })
    })
}

export const useDeleteTagQuery = () => {
    const { pushToast } = useToast();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (tagId: TagDeleteInput) => await TagsService.deleteTag(tagId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: tagsKeys.all });
            queryClient.invalidateQueries({ queryKey: categoriesKeys.all });
        },
        onError: (error) => pushToast({
            label: `Deleting failed$`,
            status: 'error',
            type: 'popup',
            text: `${error instanceof Error ? error.message : 'Unknown error'}`
        })
    })
}