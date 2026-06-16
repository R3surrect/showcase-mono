import type { Task } from "./Project.types";

export const sumTasks = (task: Task) => {
    if (!task) return 0;
    return Object.values(task).reduce((acc, curr) => acc + curr, 0)
};
