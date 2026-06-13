import { api } from '@/shared/api/api';
import type { TagCreateClientPayload } from '@showcase-mono/backend/routes/api/v1/templates/tags/tag.types';

export const TagsService = {
    async getAll() {
        const res = await api.templates.tags.$get();
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}: ${res.statusText}`);

        return await res.json();
    },
    async createTag(tagData: TagCreateClientPayload) {
        const res = await api.templates.tags.$post({ json: tagData });
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}: ${res.statusText}`);

        return await res.json();
    }
}

