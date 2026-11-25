import sql from "../../../../../db.js";
import type {
    TagDbCreateInput,
    TagCreateOutput,
    TagDbDeleteInput,
    TagBaseOutput
} from "./tag.types.js";

export type QueryTagsByUserId = (userId: number) => Promise<TagBaseOutput[]>;
export const findTagsByUserId: QueryTagsByUserId = (userId) =>
    sql<TagCreateOutput[]>`
        SELECT id, label, color, type, category, created_at, updated_at
        FROM tags
        WHERE owner_id = ${userId}
    `;


export type QueryTagByOwner = (data: TagDbDeleteInput) => Promise<TagBaseOutput[]>;
export const findTagById: QueryTagByOwner = ({ id, ownerId }) =>
    sql<TagBaseOutput[]>`
        SELECT * from TAGS
        WHERE id = ${id} and owner_id = ${ownerId}
    `;

export type InsertTagMutation = (data: TagDbCreateInput) => Promise<TagBaseOutput[]>;
export const createTag: InsertTagMutation = ({ label, color, type, category, ownerId }) =>
    sql<TagCreateOutput[]>`
        INSERT INTO tags(label, color, type, category, owner_id)
        values (${label},${sql.json(color)},${type},${category},${ownerId})
        RETURNING *
    `;

export type DeleteTagMutation = (data: TagDbDeleteInput) => Promise<TagBaseOutput[]>;
export const deleteTag: DeleteTagMutation = ({ id, ownerId }) =>
    sql<TagCreateOutput[]>` 
        DELETE FROM tags
        WHERE id = ${id} and owner_id=${ownerId} and category != 'System'
        RETURNING *;
    `;