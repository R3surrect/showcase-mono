import sql from "../../../../db.js";

export const findNotesByUserId = (userId: number) =>
    sql`
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