import type { TagGetInput } from "@showcase-mono/backend/routes/api/v1/templates/tags/tag.types";

export type TagProps = Omit<
    Partial<React.HTMLAttributes<HTMLDivElement>>, 'style' | 'className' | 'color' | 'id'
>
    & Omit<TagGetInput, 'id' | 'createdAt' | 'emoji'>
    & Partial<Pick<TagGetInput, 'id' | 'createdAt'| 'emoji'>>

export interface ColorVariable extends React.CSSProperties {
    '--tag-color': string;
}