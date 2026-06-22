import type { ReactNode } from "react";
import type { AxisSizeVariations, DivUiRefComponent } from "../_shared/system.types";
import type { VARIANT_ICONS } from "./Banner.constants";

export type Variants = keyof typeof VARIANT_ICONS;

export interface BannerProps extends DivUiRefComponent {
    width?: AxisSizeVariations;
    children: ReactNode;
    variant: Variants;
    hintId?: string;
    onClose?: () => void;
    onAction?: () => void;
    onAfterClose?: () => void;
};

export interface BannerVars extends React.CSSProperties {
    '--banner-width': string;
};