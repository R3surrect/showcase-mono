import type z from "zod";
import type { taskSchema } from "./tasks.schema.js";
import type {
    taskCreateDbInputValidation,
    taskCreateInputValidation,
    taskCreateOutputSchema,
} from "./validations/task.create.js";
import type {
    taskDbUpdateValidation,
    taskUpdateOutputSchema,
    taskUpdateValidation
} from "./validations/task.update.js";
import type {
    taskDbDeleteValidation,
    taskDeleteValidation
} from "./validations/task.delete.js";

export type Task = z.infer<typeof taskSchema>;
export type TaskId = Task['id'];
export type TaskOwnerId = Task['ownerId'];

export type TasksGetOutput = Omit<Task, 'ownerId' | 'updatedAt'>;

export type TaskCreateInput = z.infer<typeof taskCreateInputValidation>;
export type TaskDbCreateInput = z.infer<typeof taskCreateDbInputValidation>;

// export type TaskDeleteInput = Pick<Task, 'id'>;
// export type TaskDbDeleteInput = Pick<Task, 'id' | 'ownerId'>;

export type TaskCreateOutput = z.infer<typeof taskCreateOutputSchema>;

export type TaskUpdateInput = z.infer<typeof taskUpdateValidation>;
export type TaskDbUpdateInput = z.infer<typeof taskDbUpdateValidation>;
export type TaskUpdateOutput = z.infer<typeof taskUpdateOutputSchema>;

//* DELETE
export type TaskDbDeleteInput = z.infer<typeof taskDbDeleteValidation>;
export type TaskDeleteInput = z.infer<typeof taskDeleteValidation>;