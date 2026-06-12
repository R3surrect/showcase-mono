import type { TagClientPayload } from "@showcase-mono/backend/routes/api/v1/templates/tags/tag.types";

export type TagProps = Omit<
    Partial<React.HTMLAttributes<HTMLDivElement>>, 'style' | 'className' | 'color' | 'id'
> & TagClientPayload

export interface ColorVariable extends React.CSSProperties {
    '--tag-color': string;
}