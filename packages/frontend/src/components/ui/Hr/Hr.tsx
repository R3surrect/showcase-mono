import clsx from "clsx";
import styledObj from "./Hr.module.css";
import type { HrProps, HRVars } from "./Hr.types";

const Hr = ({
    variant = "subtle",
    shadow = false,
    thickness = "thin",
    opacity = 1,
    ...props
}: HrProps) => {
    return <hr
        style={{
            '--hr-thickness': `var(--thickness-${thickness})`,
            '--hr-opacity': opacity,
        } as HRVars}

        className={clsx(
            styledObj.hr,
            styledObj[variant],
            shadow && styledObj.shadow,
        )}
        {...props}
    />
}

export default Hr;
