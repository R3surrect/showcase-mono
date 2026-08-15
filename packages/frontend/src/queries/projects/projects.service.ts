import { api } from "@/shared/api/api"
import type { ProjectCreateInput, ProjectUpdateInput } from "@showcase-mono/backend/routes/api/v1/projects/projects.types";
// import type { ProjectCreateInput } from "@showcase-mono/backend/routes/api/v1/projects/projects.types";

export const ProjectsService = {
    async getAll() {
        const res = await api.projects.$get();
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}: ${res.statusText}`)

        return await res.json();
    },

    async createProject(projectData: ProjectCreateInput) {
        const res = await api.projects.$post({ json: projectData });
        if (!res.ok) throw new Error(`Creating failed: ${res.status}: ${res.statusText}`);

        return await res.json();
    },

    async updateProject(projectData: ProjectUpdateInput) {
        if (!projectData.id) return;

        const res = await api.projects[':id'].$patch({
            param: { id: projectData.id.toString() },
            json: projectData
        });

        if (!res.ok) throw new Error(`Update failed: ${res.status}: ${res.statusText}`);

        const result = await res.json();
        return result;
    },
}