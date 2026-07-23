import { api } from "@/shared/api/api"

export const PrioritiesService = {
    async getAll() {
        const res = await api.priorities.$get();
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}: ${res.statusText}`);

        return await res.json();
    },
}