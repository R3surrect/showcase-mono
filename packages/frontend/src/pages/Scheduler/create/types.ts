import type { Project } from "@showcase-mono/backend/routes/api/v1/projects/projects.types";

export type OptionType = Pick<Project, 'id' | 'emoji' | 'label'>;
export interface TaskCreateFormProps {
    selectedDate?: Date;
};