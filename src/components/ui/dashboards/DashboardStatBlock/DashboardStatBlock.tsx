// #region Imports
import Heading from "@components/ui/Heading/Heading";
import Stack from "@components/ui/Stack/Stack";
import stylesObj from './DashboardStatBlock.module.css';
import type { Alignment, DashboardStatBlockProps, IconColor, Variants } from "./DashboardStatBlock.types";
import type { Align } from "@components/ui/_shared/system.types";
import Text from "@components/ui/Text/Text";
import Surface from "@components/ui/Surface/Surface";
// #endregion

const alignMap: Record<Alignment, Exclude<Align, 'stretch'>> = {
    left: 'start',
    center: 'center',
    right: 'end',
} as const;

const DashboardStatBlock = <T extends Variants = Variants>({
    iconObj,
    variant = 'full' as T,
    isAnimated = false,
    label,
    value,
    valueLabel,
    subtitle,
    alignment = 'left',
    justify = 'space-between',
    ...props
}: DashboardStatBlockProps<T>) => {
    return <Surface
        variant='solid'
        height="fit-content"
        data-animated={isAnimated}
        isAnimated={isAnimated}
        {...props}
    >
        <Stack direction="column" gap="sm" align={alignMap[alignment]} justify={justify} >
            <Stack direction="row" align={alignMap[alignment]} justify={justify} >
                <Heading level={6} align={alignMap[alignment]} variant="secondary" >
                    {label.toString().toUpperCase()}
                </Heading>

                {variant === 'full' && iconObj
                    && <div
                        className={stylesObj.iconWrapper}
                        style={{
                            '--icon-color': iconObj?.color
                        } as IconColor}
                    >
                        <iconObj.icon
                            width={24}
                            strokeWidth={1.25}
                            height={24}
                            stroke={iconObj?.color}
                        />
                    </div>}
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

export default DashboardStatBlock;