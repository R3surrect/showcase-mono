import Heading from "@components/ui/Heading/Heading";
import Stack from "@components/ui/Stack/Stack";
import stylesObj from './DashboardStatBlockFull.module.css';
import Text from "@components/ui/Text/Text";
import Surface from "@components/ui/Surface/Surface";
import type { DashboardStatBlockFullProps, IconColor } from "@/components/entities/ui/dashboards/DashboardStatBlockFull/DashboardStatBlockFull.types";

const DashboardStatBlockFull = ({
    iconObj,
    isAnimated = false,
    label,
    value,
    valueLabel,
    subtitle,
    variant = 'solid',
    alignment = 'start',
    justify = 'space-between',
    iconPosition = 'end',
    iconHasContainer = true,
    ...props
}: DashboardStatBlockFullProps) => {

    const icon = <iconObj.icon
        width={16}
        strokeWidth={2.25}
        height={16}
        stroke={iconObj?.color}
    />;

    const renderIcon = iconHasContainer ? <div
        className={stylesObj.iconWrapper}
        data-outline={variant === 'outline'}
        style={{
            '--icon-color': iconObj?.color,
        } as IconColor}
    >
        {icon}
    </div>
        : icon;

    return <Surface
        variant={variant}
        isAnimated={isAnimated}
        color={iconObj.color}
        {...props}
    >
        <Stack direction="column" gap="sm" align={alignment} justify={justify}>
            <Stack
                direction={iconPosition === 'start' ? 'row-reverse' : 'row'}
                align="center"
                justify={justify}
                gap="sm"
                width="full"
            >
                <Heading level={3} align={alignment} variant="secondary">
                    {label}
                </Heading>
                {renderIcon}
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