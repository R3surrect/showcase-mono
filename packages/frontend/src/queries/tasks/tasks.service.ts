import { api } from "@/shared/api/api"
import type { TaskCreateInput, TaskUpdateInput } from "@showcase-mono/backend/routes/api/v1/tasks/tasks.types";

export const TasksService = {
    async getAll() {
        const res = await api.tasks.$get();
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}: ${res.statusText}`)

        return await res.json();
    },

    async createTask(taskData: TaskCreateInput) {
        const res = await api.tasks.$post({ json: taskData });
        if (!res.ok) throw new Error(`Creating failed: ${res.status}: ${res.statusText}`);

        return await res.json();
    },

    async updateTask(taskData: TaskUpdateInput) {
        if (!taskData.id) return;

        const res = await api.tasks[':id'].$patch({
            param: { id: taskData.id.toString() },
            json: taskData
        });

        if (!res.ok) throw new Error(`Update failed: ${res.status}: ${res.statusText}`);

        const result = await res.json();
        return result;
    },
}