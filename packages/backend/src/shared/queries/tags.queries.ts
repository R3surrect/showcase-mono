import sql from "#/db.js"
import type {
    CategoryTagOutput,
    PriorityTagOutput,
    StatusTagOutput
} from "#/routes/api/v1/templates/tags/tag.types.js";

type GetDistinctCategories = (ownerId: number) => Promise<CategoryTagOutput[]>;
export const getDistinctCategories: GetDistinctCategories = (ownerId) => sql<CategoryTagOutput[]>`
        SELECT DISTINCT ON (category) id, category, color
        FROM tags
        WHERE owner_id = ${ownerId}
        ORDER BY category, id ASC
    `

type GetPriorities = (ownerId: number) => Promise<PriorityTagOutput[]>;
export const getPriorityTags: GetPriorities = (ownerId: number) => sql<PriorityTagOutput[]>`
        SELECT id, color, label, type, category, created_at
        FROM tags
        WHERE owner_id = ${ownerId} and type = 'priority'
    `;

type GetStatuses = (ownerid: number, type: 'task' | 'project') => Promise<StatusTagOutput[]>;
export const getStatusTags: GetStatuses = async (ownerId, type) => {
    const fullType = `${type}_status`;

    const rows = sql<StatusTagOutput[]>`
        SELECT id, color, label, type, category, created_at
        FROM tags
        WHERE owner_id = ${ownerId} and type = ${fullType}
    `;

    return rows;
}