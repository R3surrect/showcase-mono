import type { TagGetOutput } from "@showcase-mono/backend/routes/api/v1/templates/tags/tag.types";
import type { AxisSizeVariations, DivUiComponent } from "../_shared/system.types";
import type { VARIANT_TYPES } from "./Tag.constants";
import type { TagType } from "@showcase-mono/backend/routes/api/v1/templates/tags/tag.schema";

export type Variants = typeof VARIANT_TYPES[number];

export interface GeneralProps extends Omit<Partial<DivUiComponent>, 'color' | 'id'> {
    width?: AxisSizeVariations;
    variant?: Variants;
}

export interface SystemTagProps {
    id?: never;
    isSystem: true;
    isEditable?: false;
    color: { h: number; s: number; l: number };
    onDeleteAction?: never;
    onEditAction?: never;
    type: TagType;
}

export interface MutableDefaultTagProps extends Omit<TagGetOutput, 'label'> {
    isSystem?: false;
    isEditable: true;
    onDeleteAction: (id: number) => void;
    onEditAction: (id: number) => void;
}

export interface ImmutableDefaultTagProps extends Omit<TagGetOutput, 'label'> {
    isSystem?: false;
    isEditable?: false;
    onDeleteAction?: never;
    onEditAction?: never;
}

export type TagProps = (SystemTagProps | MutableDefaultTagProps | ImmutableDefaultTagProps) & GeneralProps;
export interface ColorVariable extends React.CSSProperties {
    '--tag-color': string;
}