import type { TagGetOutput } from "@showcase-mono/backend/routes/api/v1/templates/tags/tag.types";
import type { AxisSizeVariations, DivUiComponent } from "../_shared/system.types";
import type { VARIANT_TYPES } from "./Tag.constants";

export type Variants = typeof VARIANT_TYPES[number];

export interface GeneralProps {
    width?: AxisSizeVariations;
    variant?: Variants;
};

export type TagProps = Omit<Partial<DivUiComponent>, 'color' | 'id'>
    & Omit<TagGetOutput, 'id' | 'createdAt' | 'emoji'>
    & Partial<Pick<TagGetOutput, 'id' | 'createdAt'>>
    & GeneralProps;

export interface ColorVariable extends React.CSSProperties {
    '--tag-color': string;
}