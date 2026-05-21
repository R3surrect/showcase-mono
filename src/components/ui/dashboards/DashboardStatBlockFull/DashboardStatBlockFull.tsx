// #region Imports
import Heading from "@components/ui/Heading/Heading";
import Stack from "@components/ui/Stack/Stack";
import stylesObj from './DashboardStatBlockFull.module.css';
import type { DashboardStatBlockFullProps, IconColor } from "./DashboardStatBlockFull.types";
import Text from "@components/ui/Text/Text";
import Surface from "@components/ui/Surface/Surface";
import { physicalToLogical } from "../../_shared/system.constants";
// #endregion

const DashboardStatBlockFull = ({
    iconObj,
    isAnimated = false,
    label,
    value,
    valueLabel,
    subtitle,
    variant = 'solid',
    alignment = 'left',
    justify = 'space-between',
    ...props
}: DashboardStatBlockFullProps) => {
    return <Surface
        variant={variant}
        height="fit-content"
        data-animated={isAnimated}
        isAnimated={isAnimated}
        {...props}
    >
        <Stack direction="column" gap="sm" align={physicalToLogical[alignment]} justify={justify} >
            <Stack direction="row" align={physicalToLogical[alignment]} justify={justify} >
                <Heading level={6} align={physicalToLogical[alignment]} variant="secondary" >
                    {label.toString().toUpperCase()}
                </Heading>

                <div
                    className={stylesObj.iconWrapper}
                    style={{
                        '--icon-color': iconObj?.color
                    } as IconColor}
                >
                    <iconObj.icon
                        width={16}
                        strokeWidth={2.25}
                        height={16}
                        stroke={iconObj?.color}
                    />
                </div>
            </Stack>
            <Text
                as="span"
                weight="bolder"
                size={2}
            >
                {value} {valueLabel && <Text as="span" size={3}>{valueLabel}</Text>}
            </Text>
            {subtitle && <Text size={6}>{subtitle}</Text>}
        </Stack>
    </Surface>
}

export default DashboardStatBlockFull;