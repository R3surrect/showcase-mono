import { api } from '@/shared/api/api';

export const TagsService = {
    async getAll() {
        const res = await api.templates.tags.$get();
        if (!res.ok) return {
            success: false as const,
            error: [{ message: res.status + ' ' + res.statusText }]
        };
        return await res.json();
    }
}

