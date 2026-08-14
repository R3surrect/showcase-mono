import sql from "#/db.js";
import type { TaskCreateOutput, TaskDbCreateInput, TaskDbDeleteInput, TasksGetOutput } from "./scheduler.types.js";

export type QueryTasksByUserId = (userId: number) => Promise<TasksGetOutput[]>;
export const findTasksByUserId: QueryTasksByUserId = async (userId) => {
    const rows = await sql<TasksGetOutput[]>`
        SELECT *
        FROM tasks
        WHERE owner_id = ${userId}
    `

    return [...rows];
}

export type InsertTaskMutation = (data: TaskDbCreateInput) => Promise<TaskCreateOutput[]>;
export const createTask: InsertTaskMutation = async (props) => {
    const rows = await sql<TaskCreateOutput[]>`
        INSERT INTO tasks(label, details, deadline, owner_id, project_id, priority_tag_id, status_tag_id)
        values (${props.label},${props.details || null},${props.deadline},${props.ownerId},${props.projectId},${props.priorityTagId},${props.statusTagId},)
        RETURNING *
    `

    return [...rows];
}

export type QueryTaskByOwner = (data: TaskDbDeleteInput) => Promise<TaskCreateOutput[]>;
export const findTaskById: QueryTaskByOwner = async ({ id, ownerId }) => {
    const rows = await sql<TasksGetOutput[]>`
        SELECT * from TASKS
        WHERE id = ${id} and owner_id = ${ownerId}
    `;

    return [...rows];
}

export const deleteTask: QueryTaskByOwner = async ({ id, ownerId }) => {
    const rows = await sql<TaskCreateOutput[]>` 
        DELETE FROM tasks
        WHERE id = ${id} and owner_id=${ownerId}
        RETURNING *;
    `;

    return [...rows];
}