import clsx from "clsx";
import styledObj from "./Hr.module.css";
import type { ComponentPropsWithoutRef } from "react";

type opacityLevel = 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9;

interface HrProps extends ComponentPropsWithoutRef<'hr'> {
    variant?: 'default' | 'strong' | 'accent' | 'subtle' | 'glass';
    thickness?: "thin" | "medium" | "thick";
    shadow?: boolean;
    opacity?: opacityLevel;
}

interface HRVars extends React.CSSProperties {
    '--hr-thickness'?: string;
    '--hr-opacity'?: number;
}

const thicknessValues: Record<NonNullable<HrProps['thickness']>, number> = {
    thin: 1,
    medium: 5,
    thick: 10,
}

const variants = {
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
        {...props}
        style={{
            '--hr-thickness': `${thicknessValues[thickness]}px`,
            ...((opacity !== undefined) && { '--hr-opacity': opacity })
        } as HRVars}
        className={clsx(
            styledObj.hr,
            variants[variant],
            shadow && styledObj.shadow,
        )}
    />
}

export default Hr;