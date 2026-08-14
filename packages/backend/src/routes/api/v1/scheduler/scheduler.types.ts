import type z from "zod";
import type { taskSchema } from "./scheduler.schema.js";
import type { taskCreateDbInputValidation, taskCreateInputValidation, taskCreateOutput } from "./validations/task.create.js";

export type Task = z.infer<typeof taskSchema>;
export type TaskId = Task['id'];
export type TaskOwnerId = Task['ownerId'];

export type TasksGetOutput = Omit<Task, 'ownerId' | 'updatedAt'>;

export type TaskCreateInput = z.infer<typeof taskCreateInputValidation>;
export type TaskDbCreateInput = z.infer<typeof taskCreateDbInputValidation>;

export type TaskDeleteInput = Pick<Task, 'id'>
export type TaskDbDeleteInput = Pick<Task, 'id' | 'ownerId'>

export type TaskCreateOutput = z.infer<typeof taskCreateOutput>;