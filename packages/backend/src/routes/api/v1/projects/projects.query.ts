import sql from "#/db.js"
import {
    type ProjectDbCreateInput,
    type ProjectDbUpdateInput,
    type ProjectGetOutput,
    type ProjectUpdateOutput,
} from './projects.types.js'

export type FindProjectsByUserId = (userId: number) => Promise<ProjectGetOutput[]>;

export const findProjectsByUserId: FindProjectsByUserId = async (userId) => {
    const rows = await sql<ProjectGetOutput[]>`
        SELECT * FROM projects
        where owner_id = ${userId}
        ORDER BY is_pinned DESC, created_at DESC, id ASC
    `

    return [...rows];
}

export type CreateProject = (data: ProjectDbCreateInput) => Promise<ProjectGetOutput[]>;
export const createProject: CreateProject = async ({
    label,
    details,
    color,
    priorityTagId,
    statusTagId,
    ownerId,
    emoji,
}) => {
    const colorString = JSON.stringify(color) || null;
    const rows = await sql<ProjectGetOutput[]>`
        INSERT INTO projects(
            label,
            details,
            emoji,
            color,
            priority_tag_id,
            owner_id,
            status_tag_id
        )
        VALUES (${label},${details || null},${emoji},${colorString},${priorityTagId},${ownerId},${statusTagId})
        RETURNING *
    `;

    return [...rows]
}

export type UpdateProject = (data: ProjectDbUpdateInput) => Promise<ProjectUpdateOutput[]>;

export const updateProject: UpdateProject = async (data) => {
    const { id, ownerId, ...fieldsToUpdate } = data;
    if (id === undefined || ownerId === undefined) return [];

    const dbPayload: Record<string, unknown> = {};

    if (fieldsToUpdate.label !== undefined) dbPayload.label = fieldsToUpdate.label;
    if (fieldsToUpdate.details !== undefined) dbPayload.details = fieldsToUpdate.details;

    if (fieldsToUpdate.isPinned !== undefined) {
        dbPayload.is_pinned = fieldsToUpdate.isPinned;
        dbPayload.pinned_at = fieldsToUpdate.isPinned ? new Date() : sql`NULL`;
    }

    if (Object.keys(dbPayload).length === 0) return [];

    const rows = await sql<ProjectUpdateOutput[]>`
        UPDATE projects
        SET ${sql(dbPayload)}
        WHERE id = ${id} AND owner_id = ${ownerId}
        RETURNING *
    `;

    return rows;
}
