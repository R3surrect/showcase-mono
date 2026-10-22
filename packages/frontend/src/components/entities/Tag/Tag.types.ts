import type { HslColor } from "colord";
import type { AxisSizeVariations, MotionDivUiRefComponent } from "../_shared/system.types";
import type { VARIANT_TYPES } from "./Tag.constants";
import type { TagType } from "@showcase-mono/backend/routes/api/v1/templates/tags/tag.schema";

export type Variants = typeof VARIANT_TYPES[number];

export interface TagProps extends Omit<Partial<MotionDivUiRefComponent>, 'color' | 'id' | 'children'> {
    width?: AxisSizeVariations;
    variant?: Variants;
    id?: number;
    isSystem?: boolean;
    isEditable?: boolean;
    color: HslColor;
    type: TagType;
    category?: string;
    createdAt?: string | Date;
    onDeleteAction?: (id: number) => void;
    onEditAction?: (id: number) => void;
    children?: React.ReactNode;
}

export interface TagVariables extends React.CSSProperties {
    '--tag-color': string;
    '--tag-width': string;
}