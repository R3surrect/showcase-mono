import type { DivUiComponent } from "../_shared/system.types"
import type { TagGetOutput } from "@showcase-mono/backend/routes/api/v1/templates/tags/tag.types"

export interface TaskCardProps extends DivUiComponent {
    hasSurface?: boolean;
    tags: TagGetOutput[];
    deadline: Date;
    createdAt: Date;
    statusTagId: number;
}