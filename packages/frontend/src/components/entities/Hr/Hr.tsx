import clsx from "clsx";
import styledObj from "./Hr.module.css";
import type { HrProps, HrVars } from "@/components/entities/Hr/Hr.types";

const Hr = ({
    variant = "subtle",
    shadow = false,
    thickness = "thin",
    opacity = 1,
    ...props
}: HrProps) => {
    const style: HrVars = {
        '--hr-thickness': `var(--thickness-${thickness})`,
        '--hr-opacity': opacity,
    };

    return <hr
        style={style}
        className={clsx(
            styledObj.hr,
            styledObj[variant],
            shadow && styledObj.shadow,
        )}
        {...props}
    />
}

export default Hr;
