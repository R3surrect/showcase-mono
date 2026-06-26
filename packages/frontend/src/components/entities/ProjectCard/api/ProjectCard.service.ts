import { api } from "@/shared/api/api"
// import type { ProjectCreateInput } from "@showcase-mono/backend/routes/api/v1/projects/projects.types";

export const ProjectService = {
    async getAll() {
        const res = await api.projects.$get();
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}: ${res.statusText}`)

        return await res.json();
    },
    // async createProject(projectData: ProjectCreateInput) {
    //     const res = await api.projects.$post({ json: projectData });
    //     if (!res.ok) throw new Error(`Fetch failed: ${res.status}: ${res.statusText}`);

    //     return await res.json();
    // }
}