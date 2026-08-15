import { taskSchema } from "../scheduler.schema.js";

export const taskDeleteValidation = taskSchema.pick({
    id: true,
});

export const taskDbDeleteValidation = taskSchema.pick({
    id: true,
    ownerId: true,
})