import Stack from "@components/ui/Stack/Stack"
import Text from "@components/ui/Text/Text";
import Surface from "@components/ui/Surface/Surface";
import type { HTMLMotionProps } from "motion/react";
import type { Variants } from "../../Surface/Surface.types";
import Heading from "../../Heading/Heading";

export interface DashboardStatBlockMinimalProps extends Omit<HTMLMotionProps<'div'>, 'style' | 'className'> {
    title: string;
    value: string;
    valueLabel?: string;
    subtitle: string;
    isAnimated?: boolean;
    variant?: Variants;
}

const DashboardStatBlockMinimal = ({ title, value, valueLabel, subtitle, variant = 'solid', isAnimated = false, ...props }: DashboardStatBlockMinimalProps) => {
    return <Surface data-animated={isAnimated} variant={variant} {...props}>
        <Stack gap="md" align="center">
            <Heading level={3} variant="secondary">{title}</Heading>
            <div>
                <Text as='span' size={2}>{value}</Text> {valueLabel && <Text as='span'> {valueLabel}</Text>}
            </div>
            <Text size={3}>{subtitle}</Text>
        </Stack>
    </Surface>
}

export default DashboardStatBlockMinimal;