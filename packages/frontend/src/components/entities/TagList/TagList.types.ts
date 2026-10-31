import type { TagGetOutput } from "@showcase-mono/backend/routes/api/v1/templates/tags/tag.types";

export interface BaseTagProps {
    tags: TagGetOutput[];
}

export interface EditableTagsProps {
    isEditable: true;
    onDeleteAction: (id: number) => void;
    onEditAction: (id: number) => void;
    selectedTags?: never;
    setSelectedList?: never;
}

export interface StaticTagsProps {
    isEditable?: false;
    onDeleteAction?: never;
    onEditAction?: never;
    selectedTags: number[];
    setSelectedList: (items: number[]) => void;
}

export type TagListProps = BaseTagProps & (EditableTagsProps | StaticTagsProps);