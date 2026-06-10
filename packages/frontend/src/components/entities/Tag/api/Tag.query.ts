import { useQuery } from '@tanstack/react-query';
import { TagsService } from './Tag.service';

export const tagsKeys = {
    all: ['tags'] as const,
};

export const useTagsQuery = () => {
    return useQuery({
        queryKey: tagsKeys.all,
        queryFn: TagsService.getAll,
        staleTime: 5 * 60 * 1000,
    })
}