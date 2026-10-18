import sql from "../../../../db.js";
import type { TaskCreateOutput, TaskDbCreateInput, TaskDbDeleteInput, TaskDbUpdateInput, TaskBaseOutput, TaskUpdateOutput, TasksWithDetailsOutput, Task } from "./tasks.types.js";

export type QueryTasksByUserId = (userId: number) => Promise<TasksWithDetailsOutput[]>;
export type InsertTaskMutation = (data: TaskDbCreateInput) => Promise<TaskCreateOutput>;
export type QueryTaskByOwner = (data: TaskDbDeleteInput) => Promise<TaskCreateOutput[]>;
export type UpdateTask = (data: TaskDbUpdateInput) => Promise<TaskUpdateOutput | null>;
export type QueryTaskByProjectId = (projectId: number, userId: number) => Promise<TaskBaseOutput[]>;

export const findTasksByUserId: QueryTasksByUserId = (userId) =>
    sql<TasksWithDetailsOutput[]>`
        SELECT t.*,
        row_to_json(projects.*) as project,
        COALESCE(
            (
                SELECT json_agg(tags.*)
                FROM pivot_tasks_tags as ptt
                JOIN tags on ptt.tag_id = tags.id
                WHERE ptt.task_id = t.id
            ), '[]'::json
        ) as tags
        FROM tasks as t
        left join projects on t.project_id = projects.id
        where t.owner_id = ${userId};
    `;

export const findTasksByProject: QueryTaskByProjectId = (projectId, userId) =>
    sql<TaskBaseOutput[]>`
    SELECT t.*,
        row_to_json(projects.*) as project,
        COALESCE(
            (
                SELECT json_agg(tags.*)
                FROM pivot_tasks_tags as ptt
                JOIN tags on ptt.tag_id = tags.id
                WHERE ptt.task_id = t.id
            ), '[]'::json
        ) as tags
        FROM tasks as t
        left join projects on t.project_id = projects.id
        where t.owner_id = ${userId} and t.project_id = ${projectId};
    `;

export const createTask: InsertTaskMutation = async (props) => {
    const result = await sql.begin(async (tx) => {
        const { tagIds, ...queryData } = props;

        const [task] = await tx<TaskBaseOutput[]>`
            INSERT INTO tasks ${sql(queryData)}
            RETURNING *
        `;

        if (!task || task === null) throw new Error('Task wasn\'t created');

        if (tagIds && tagIds.length > 0) {
            const pivotRows = tagIds.map(tagId => ({
                task_id: task.id,
                tag_id: tagId,
                owner_id: props.ownerId
            }));
            await tx`INSERT INTO pivot_tasks_tags ${tx(pivotRows, 'task_id', 'tag_id', 'owner_id')}`;
        }

        return { ...task, tagIds };
    })

    if (!result || result === null) throw new Error('Task wasn\'t created')
    return result;
}

export const findTaskById: QueryTaskByOwner = ({ id, ownerId }) =>
    sql<TaskBaseOutput[]>`
        SELECT t.*,
        row_to_json(projects.*) as project,
        COALESCE(
            (
                SELECT json_agg(tags.*)
                FROM pivot_tasks_tags as ptt
                JOIN tags on ptt.tag_id = tags.id
                WHERE ptt.task_id = t.id
            ), '[]'::json
        ) as tags 
        FROM tasks as t
        left join projects on t.project_id = projects.id
        where t.owner_id = ${ownerId} and t.id = ${id};
    `;

export const deleteTask: QueryTaskByOwner = ({ id, ownerId }) =>
    sql<TaskCreateOutput[]>` 
        DELETE FROM tasks
        WHERE id = ${id} and owner_id=${ownerId}
        RETURNING *;
    `;

export const updateTask: UpdateTask = async ({ id, ownerId, ...rawUpdateObj }) => {
    if (id === undefined || ownerId === undefined) return null;
    const { tagIds, ...fieldsToUpdate } = rawUpdateObj;

    const rawPayload = {
        ...fieldsToUpdate,
        ...(fieldsToUpdate.isPinned !== undefined && {
            pinnedAt: fieldsToUpdate.isPinned ? new Date() : null
        })
    };

    const dbPayload = Object.fromEntries(
        Object.entries(rawPayload).filter(([_, value]) => value !== undefined)
    );

    const task = await sql.begin(
        async (tx) => {
            let finalTags: number[], finalTask: Task | undefined;

            if (Object.keys(dbPayload).length !== 0) {
                [finalTask] = await tx<Task[]>`
                    UPDATE tasks
                    SET ${sql(dbPayload)}
                    WHERE id = ${id} AND owner_id = ${ownerId}
                    RETURNING *
                `;
            } else {
                [finalTask] = await tx<Task[]>`
                    SELECT * FROM tasks
                    WHERE id = ${id} and owner_id = ${ownerId}
                `;
            }

            if (!finalTask) return null;

            if (Array.isArray(tagIds)) {
                await tx`DELETE FROM pivot_tasks_tags WHERE task_id = ${id} AND owner_id = ${ownerId}`;

                if (tagIds.length > 0) {
                    const pivotRows = tagIds.map(tagId => ({ task_id: id, tag_id: tagId, owner_id: ownerId }));
                    const tags = await tx<{ tag_id: number }[]>`
                        INSERT INTO pivot_tasks_tags ${tx(pivotRows, 'task_id', 'tag_id', 'owner_id')} 
                        RETURNING tag_id
                    `;

                    finalTags = tags.map(tag => tag.tag_id);
                } else {
                    finalTags = [];
                }
            } else {
                const currentTags = await tx<{ tag_id: number }[]>`
                    SELECT tag_id
                    FROM pivot_tasks_tags
                    WHERE task_id = ${id}
                    and owner_id = ${ownerId}
                `;
                finalTags = currentTags.map(tag => tag.tag_id);
            }

            return {
                ...finalTask,
                tags: finalTags
            };
        }
    );

    return task;
}

