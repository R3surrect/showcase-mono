import type { TasksGetOutput } from "@showcase-mono/backend/routes/api/v1/tasks/tasks.types";
import type { DivUiComponent } from "../_shared/system.types"
// import type { TagGetOutput } from "@showcase-mono/backend/routes/api/v1/templates/tags/tag.types"

export interface TaskCardProps extends Omit<DivUiComponent, 'id'>, TasksGetOutput{
    hasSurface?: boolean;
    // tags: TagGetOutput[];
    // createdAt: Date;
    // statusTagId: number;
}