import type { Task } from "./ProjectCard.types";

export const sumTasks = (task: Task) => {
    if (!task) return 0;
    return Object.values(task).reduce((acc, curr) => acc + curr, 0)
};
