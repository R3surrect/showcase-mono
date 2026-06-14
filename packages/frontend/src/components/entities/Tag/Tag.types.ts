import type { TagGetClientPayload } from "@showcase-mono/backend/routes/api/v1/templates/tags/tag.types";

export type TagProps = Omit<
    Partial<React.HTMLAttributes<HTMLDivElement>>, 'style' | 'className' | 'color' | 'id'
>
    & Omit<TagGetClientPayload, 'id' | 'createdAt'>
    & Partial<Pick<TagGetClientPayload, 'id' | 'createdAt'>>

export interface ColorVariable extends React.CSSProperties {
    '--tag-color': string;
}