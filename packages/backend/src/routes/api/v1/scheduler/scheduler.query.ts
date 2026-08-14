import sql from "#/db.js";
import type { TaskCreateOutput, TaskDbCreateInput, TaskDbDeleteInput, TasksGetOutput } from "./scheduler.types.js";

export type QueryTasksByUserId = (userId: number) => Promise<TasksGetOutput[]>;
export type InsertTaskMutation = (data: TaskDbCreateInput) => Promise<TaskCreateOutput>;
export type QueryTaskByOwner = (data: TaskDbDeleteInput) => Promise<TaskCreateOutput[]>;

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