import type { AxisSizeVariations, Size } from "../_shared/system.types";
import type { TYPE_TYPES, VARIANT_TYPES } from "./Button.constants";
import type { ComponentPropsWithRef } from "react";

export type Type = typeof TYPE_TYPES[number];
export type Variant = typeof VARIANT_TYPES[number];

export interface ButtonProps extends Omit<ComponentPropsWithRef<'button'>, 'className' | 'style'> {
  type?: Type;
  variant?: Variant;
  isSubmitting?: boolean;
  width?: AxisSizeVariations;
  radius?: Size;
  // size?: Size;
  isHoverAnimated?: boolean;
}
