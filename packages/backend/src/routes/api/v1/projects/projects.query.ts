import sql from "#/db.js"
import { type ProjectDbCreateInput, type ProjectGetOutput } from './projects.types.js'

export type FindProjectsByUserId = (userId: number) => Promise<ProjectGetOutput[]>;

export const findProjectsByUserId: FindProjectsByUserId = async (userId) => {
    const rows = await sql<ProjectGetOutput[]>`
        SELECT * FROM projects
        where owner_id = ${userId}
    `

    return [...rows];
}

export type CreateProject = (data: ProjectDbCreateInput) => Promise<ProjectGetOutput[]>;

export const createProject: CreateProject = async ({
    label,
    details,
    color,
    priority,
    ownerId,
    emoji,
    isPinned,
    isArchived
}) => {
    const colorString = JSON.stringify(color) || null;

    const rows = await sql<ProjectGetOutput[]>`
        INSERT INTO projects(
            label,
            details,
            emoji,
            color,
            owner_id,
            priority,
            is_pinned,
            is_archived
        )
        VALUES (
            ${label},${details || null},${emoji},${colorString},${ownerId},${priority},${isPinned},${isArchived}
        )
    `;

    return [...rows]
}