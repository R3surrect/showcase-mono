import type { TaskBaseOutput } from "@showcase-mono/backend/routes/api/v1/tasks/tasks.types";
import type { DivUiComponent } from "../_shared/system.types"
import type { TagGetOutput } from "@showcase-mono/backend/routes/api/v1/templates/tags/tag.types";
// import type { TagGetOutput } from "@showcase-mono/backend/routes/api/v1/templates/tags/tag.types"

export interface TaskCardProps extends Omit<DivUiComponent, 'id'>, TaskBaseOutput{
    hasSurface?: boolean;
    tags: TagGetOutput[];
    onTagDelete?: (taskId: number, tagId: number) => void;
    toolbar?: React.ReactNode;
    // createdAt: Date;
    // statusTagId?: number;
}