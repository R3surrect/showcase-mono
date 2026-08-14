import type z from "zod";
import type { taskSchema } from "./scheduler.schema.js";

export type Task = z.infer<typeof taskSchema>;
export type TaskId = Task['id'];
export type TaskOwnerId = Task['ownerId'];

export type TasksGetOutput = Omit<Task, 'ownerId' | 'updatedAt'>;

export type ProjectCreateInput = z.infer<typeof taskCreateInputValidation>;