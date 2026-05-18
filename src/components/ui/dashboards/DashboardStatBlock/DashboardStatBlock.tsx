import Heading from "@components/ui/Heading/Heading";
import Stack from "@components/ui/Stack/Stack";
import stylesObj from './DashboardStatBlock.module.css';
import DashboardSurface from "../DashboardSurface/DashboardSurface";
import type { Alignment, DashboardStatBlockProps, IconColor, Variants } from "./DashboardStatBlock.types";
import type { Align } from "@components/ui/_shared/system.types";

const alignMap: Record<Alignment, Exclude<Align, 'stretch'>> = {
    left: 'start',
    center: 'center',
    right: 'end',
} as const;

const DashboardStatBlock = <T extends Variants = Variants>({
    iconObj,
    variant = 'full' as T,
    label,
    value,
    subtitle = '',
    alignment = 'left',
    justify = 'space-between',
    ...props
}: DashboardStatBlockProps<T>) => {
    return <DashboardSurface {...props}>
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

            <Heading
                align={alignMap[alignment]}
                level={2}
                variant="secondary"
                subtitle={subtitle}>
                {value}
            </Heading>
        </Stack>
    </DashboardSurface>
}

export default DashboardStatBlock;