import type { TagGetOutput } from "@showcase-mono/backend/routes/api/v1/templates/tags/tag.types";

export type TagProps = Omit<
    Partial<React.HTMLAttributes<HTMLDivElement>>, 'style' | 'className' | 'color' | 'id'
>
    & Omit<TagGetOutput, 'id' | 'createdAt' | 'emoji'>
    & Partial<Pick<TagGetOutput, 'id' | 'createdAt' >>

export interface ColorVariable extends React.CSSProperties {
    '--tag-color': string;
}