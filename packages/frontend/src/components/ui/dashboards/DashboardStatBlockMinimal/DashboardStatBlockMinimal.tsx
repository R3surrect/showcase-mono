import Stack from "@components/ui/Stack/Stack"
import Text from "@components/ui/Text/Text";
import Surface from "@components/ui/Surface/Surface";
import Heading from "../../Heading/Heading";
import type { DashboardStatBlockMinimalProps } from "@/components/entities/ui/dashboards/DashboardStatBlockMinimal/DashboardStatBlockMinimal.types";

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
            <Heading level={3} variant="secondary">{title}</Heading>
            <div>
                <Text weight="bolder" as='span' size={2}>{value}</Text> {valueLabel && <Text as='span'> {valueLabel}</Text>}
            </div>
            <Text size={3}>{subtitle}</Text>
        </Stack>
    </Surface>
}

export default DashboardStatBlockMinimal;