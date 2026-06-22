import Stack from "@components/entities/Stack/Stack"
import Text from "@components/entities/Text/Text";
import Surface from "@components/entities/Surface/Surface";
import Heading from "../../Heading/Heading";
import type { DashboardStatBlockMinimalProps } from "@/components/entities/dashboards/DashboardStatBlockMinimal/DashboardStatBlockMinimal.types";

const DashboardStatBlockMinimal = ({
    title,
    value,
    valueLabel,
    subtitle,
    variant = 'solid',
    isAnimated = false,
    ...props
}: DashboardStatBlockMinimalProps) => {
    return <Surface data-animated={isAnimated} variant={variant} {...props}>
        <Stack gap="md" align="center">
            <Heading level={4} variant="secondary" weight="bold">{title}</Heading>
            <div>
                <Text weight="bolder" as='span' size={2}>{value}</Text> {valueLabel && <Text as='span'> {valueLabel}</Text>}
            </div>
            <Text size={4} weight="bold">{subtitle}</Text>
        </Stack>
    </Surface>
}

export default DashboardStatBlockMinimal;