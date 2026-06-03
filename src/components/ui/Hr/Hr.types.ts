import type { ComponentPropsWithoutRef } from "react";
import type { THICKNESS_TYPES, VARIANT_TYPES } from "./Hr.constants";
import type { OpacityLevel } from "../_shared/system.types";

export type Thickness = typeof THICKNESS_TYPES[number];
export type Variants = typeof VARIANT_TYPES[number];

export interface HrProps extends Omit<ComponentPropsWithoutRef<'hr'>, 'style' | 'onClick'> {
    variant?: Variants;
    thickness?: Thickness;
    shadow?: boolean;
    opacity?: OpacityLevel;
}

export interface HRVars extends React.CSSProperties {
    '--hr-thickness'?: string;
    '--hr-opacity'?: OpacityLevel;
}