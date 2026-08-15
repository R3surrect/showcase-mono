import sql from "#/db.js";
import type { TaskCreateOutput, TaskDbCreateInput, TaskDbDeleteInput, TaskDbUpdateInput, TasksGetOutput, TaskUpdateOutput } from "./tasks.types.js";

export type QueryTasksByUserId = (userId: number) => Promise<TasksGetOutput[]>;
export type InsertTaskMutation = (data: TaskDbCreateInput) => Promise<TaskCreateOutput>;
export type QueryTaskByOwner = (data: TaskDbDeleteInput) => Promise<TaskCreateOutput[]>;
export type UpdateTask = (data: TaskDbUpdateInput) => Promise<TaskUpdateOutput | null>;

export const findTasksByUserId: QueryTasksByUserId = (userId) =>
    sql<TasksGetOutput[]>`
        SELECT * FROM tasks
        WHERE owner_id = ${userId}
    `;

export const createTask: InsertTaskMutation = async (props) => {
    const result = await sql.begin(async (tx) => {
        const { tagIds, ...queryData } = props;

        const [task] = await tx<TasksGetOutput[]>`
            INSERT INTO tasks ${sql(queryData)}
            RETURNING *
        `;

        if (!task || task === null) throw new Error('Task wasn\'t created');

        if (tagIds && tagIds.length > 0) {
            const pivotRows = tagIds.map(
                tagId => ({
                    task_id: task.id,
                    tag_id: tagId
                })
            );

            await tx`INSERT INTO pivot_tasks_tags ${tx(pivotRows, 'task_id', 'tag_id')}`;
        }

        return { ...task, tagIds };
    })

    if (!result || result === null) throw new Error('Task wasn\'t created')
    return result;
}

export const findTaskById: QueryTaskByOwner = ({ id, ownerId }) =>
    sql<TasksGetOutput[]>`
        SELECT * from TASKS
        WHERE id = ${id} and owner_id = ${ownerId}
    `;

export const deleteTask: QueryTaskByOwner = ({ id, ownerId }) =>
    sql<TaskCreateOutput[]>` 
        DELETE FROM tasks
        WHERE id = ${id} and owner_id=${ownerId}
        RETURNING *;
    `;

export const updateTask: UpdateTask = async ({ id, ownerId, ...fieldsToUpdate }) => {
    if (id === undefined || ownerId === undefined) return null;

    const rawPayload = {
        ...fieldsToUpdate,
        ...(fieldsToUpdate.isPinned !== undefined && {
            pinnedAt: fieldsToUpdate.isPinned && new Date()
        })
    };

    const dbPayload = Object.fromEntries(Object.entries(rawPayload).filter((_, value) => value !== undefined));

    if (Object.keys(dbPayload).length === 0) return null;

    const [rows] = await sql<TaskUpdateOutput[]>`
        UPDATE projects
        SET ${sql(dbPayload)}
        WHERE id = ${id} AND owner_id = ${ownerId}
        RETURNING *
    `;

    return rows ?? null;
}
