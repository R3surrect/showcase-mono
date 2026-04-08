import clsx from "clsx";
import styledObj from "./Hr.module.css";
import type { ComponentPropsWithoutRef } from "react";

type opacityLevel = 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9;

const THICKNESS_TYPES = ['thin', 'half-medium', 'medium', 'thick'] as const;
const VARIANT_TYPES = ['default', 'strong', 'accent', 'subtle', 'glass'] as const;

type Thickness = typeof THICKNESS_TYPES[number];
type Variants = typeof VARIANT_TYPES[number];


interface HrProps extends Omit<ComponentPropsWithoutRef<'hr'>, 'style' | 'onClick'> {
    variant?: Variants;
    thickness?: Thickness;
    shadow?: boolean;
    opacity?: opacityLevel;
}

interface HRVars extends React.CSSProperties {
    '--hr-thickness'?: string;
    '--hr-opacity'?: number;
}

const variantsObj: Record<Variants, string> = {
    default: styledObj.default,
    strong: styledObj.strong,
    accent: styledObj.accent,
    subtle: styledObj.subtle,
    glass: styledObj.glass,
}

const Hr = ({
    variant = "subtle",
    shadow = false,
    thickness = "thin",
    opacity,
    ...props
}: HrProps) => {
    return <hr
        style={{
            '--hr-thickness': `var(--thickness-${thickness})`,
            ...((opacity !== undefined) && { '--hr-opacity': opacity })
        } as HRVars}

        className={clsx(
            styledObj.hr,
            variantsObj[variant],
            shadow && styledObj.shadow,
        )}

        {...props}
    />
}

export default Hr;
