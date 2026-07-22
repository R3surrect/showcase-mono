import { api } from '@/shared/api/api';
import type { TagCreateInput, TagDeleteInput } from '@showcase-mono/backend/routes/api/v1/templates/tags/tag.types';

export const TagsService = {
    async getAll() {
        const res = await api.templates.tags.$get();
        if (!res.ok) throw new Error(`Fetching failed: ${res.status}: ${res.statusText}`);

        return await res.json();
    },
    async createTag(tagData: TagCreateInput) {
        const res = await api.templates.tags.$post({ json: tagData });
        if (!res.ok) throw new Error(`Creating failed: ${res.status}: ${res.statusText}`);

        return await res.json();
    },
    async deleteTag(tagId: TagDeleteInput) {
        const res = await api.templates.tags[':id'].$delete({ param: { id: tagId.toString() } });
        if (!res.ok) throw new Error(`Deleting failed: ${res.status}: ${res.statusText}`);

        return await res.json();
    }
}

