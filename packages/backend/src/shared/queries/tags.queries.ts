import sql from "#/db.js"
import type { CategoryTagOutput } from "#/routes/api/v1/templates/tags/tag.types.js";

type GetDistinctCategories = (ownerId: number) => Promise<CategoryTagOutput[]>;

export const getDistinctCategories: GetDistinctCategories = async (ownerId) => {
    const rows = await sql<CategoryTagOutput[]>`
        SELECT DISTINCT ON (category) id, category, color
        FROM tags
        WHERE owner_id = ${ownerId}
        ORDER BY category, id ASC
    `;

    return rows;
}