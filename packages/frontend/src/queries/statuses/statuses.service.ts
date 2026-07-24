import { api } from "@/shared/api/api"
import type { Statuses } from "@showcase-mono/backend/routes/api/v1/tags/statuses";

export const StatusesService = {
    async getAll(type: Statuses) {
        const res = await api.statuses[':type'].$get({
            param: { type }
        });

        if (!res.ok) throw new Error(`Fetch status tags failed: ${res.status}: ${res.statusText}`);

        return await res.json();
    }
}