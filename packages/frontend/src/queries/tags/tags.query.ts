import { queryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { TagCreateInput, TagDeleteInput } from '@showcase-mono/backend/routes/api/v1/templates/tags/tag.types';
import { CategoriesService, TagsService } from './tags.service';
// import useToast from '@/components/entities/Toast/useToast';
import { DEFAULT_HSL_COLOR } from '@/components/entities/_shared/system.constants';
import { tasksKeys } from '../tasks/task.query';

export const categoriesKeys = { all: ['categories'] as const };
export const tagsKeys = {
    all: ['tags'] as const,
    detail: (id: number) => ['tags', 'detail', id] as const,
};

export const getTagsQueryOptions = () => {
    return queryOptions({
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
            color: DEFAULT_HSL_COLOR.color,
            type: 'default',
            category: 'system',
            createdAt: new Date().toISOString()
        }],
    })
}


export const useGetTagsQuery = () => useQuery(getTagsQueryOptions())

export const useGetTagByIdQuery = (id: number) => {
    return useQuery({
        queryKey: tagsKeys.detail(id),
        enabled: !!id,
        staleTime: 5 * 60 * 1000,
        retry: 3,
        retryDelay: (index) => 1000 * (index * 2),

        queryFn: async () => {
            const res = await TagsService.getTagById(id);
            return res;
        }
    });
};

export const useGetCategoriesQuery = () => {
    return useQuery({
        queryKey: categoriesKeys.all,
        staleTime: 5 * 60 * 1000,
        retry: 3,
        retryDelay: (index) => 1000 * (index * 2),
        queryFn: async () => {
            const res = await CategoriesService.getAll();
            return res;
        },
    })
}

export const useCreateTagQuery = () => {
    // const { pushToast } = useToast();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newTag: TagCreateInput) => {
            console.log(newTag);
            await TagsService.createTag(newTag)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: tagsKeys.all });
            queryClient.invalidateQueries({ queryKey: categoriesKeys.all });
        },
        onError: (error) => error,
        // pushToast({
        //     label: 'Creating failed',
        //     status: 'error',
        //     type: 'popup',
        //     text: `${error instanceof Error ? error.message : 'Unknown error'}`
        // })
    })
}

export const useDeleteTagQuery = () => {
    // const { pushToast } = useToast();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (tagId: TagDeleteInput) => await TagsService.deleteTag(tagId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: tagsKeys.all });
            queryClient.invalidateQueries({ queryKey: categoriesKeys.all });
            queryClient.invalidateQueries({ queryKey: tasksKeys.all })
        },
        onError: (error) => error,
        // pushToast({
        //     label: `Deleting failed`,
        //     status: 'error',
        //     type: 'popup',
        //     text: `${error instanceof Error ? error.message : 'Unknown error'}`
        // })
    })
}