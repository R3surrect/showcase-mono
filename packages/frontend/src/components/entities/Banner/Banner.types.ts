import type { ReactNode } from "react";
import type { AxisSizeVariations, DivUiComponent } from "../_shared/system.types";
import type { VARIANT_ICONS } from "./Banner.constants";

export type Variants = keyof typeof VARIANT_ICONS;

export interface BaseBannerProps extends DivUiComponent {
    width?: AxisSizeVariations;
    children: ReactNode;
};

export interface HintBannerProps extends BaseBannerProps {
    variant: 'hint';
    hintId: string;
}

export interface InfoBannerProps extends BaseBannerProps {
    variant: Exclude<Variants, 'hint'>
    hintId?: never;
}

export type BannerProps = HintBannerProps | InfoBannerProps;

export interface BannerVars extends React.CSSProperties {
    '--banner-width': string;
};