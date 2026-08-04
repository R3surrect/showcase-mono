export interface EditableTagsProps {
    isEditable: true;
    selectedTags?: never;
    setSelectedList?: never;
}

export interface StaticTagsProps {
    isEditable?: false;
    selectedTags: number[];
    setSelectedList: (items: number[]) => void;
}

export type TagListProps = EditableTagsProps | StaticTagsProps;