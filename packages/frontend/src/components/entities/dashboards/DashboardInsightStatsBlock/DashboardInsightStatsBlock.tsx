import Grid from '@components/entities/Grid/Grid'
import Heading from '@components/entities/Heading/Heading'
import Stack from '@components/entities/Stack/Stack';
import Surface from '@components/entities/Surface/Surface';
import DashboardStatBlockFull from "../DashboardStatBlockFull/DashboardStatBlockFull";
import DashboardStatBlockMinimal from "../DashboardStatBlockMinimal/DashboardStatBlockMinimal";
import { insightsStatsBottomMock, insightsStatsMock } from '@/components/entities/dashboards/DashboardInsightStatsBlock/DashboardInsightStatsBlock.constants';

const DashboardInsightStatsBlock = () => {
    return <Surface>
        <Stack direction='column' gap='sm'>
            <Heading variant="secondary" level={2}>Инсайты продуктивности</Heading>

            <Grid columns={2} gap='sm'>
                {insightsStatsMock.map(item => (
                    <DashboardStatBlockFull
                        iconHasContainer={false}
                        key={item.id}
                        variant='outline'
                        isAnimated={true}
                        justify='start'
                        iconPosition='start'
                        {...item}
                    />
                ))}
            </Grid>

            <Stack direction='row' align='center' gap='sm'>
                {
                    insightsStatsBottomMock.map(item => (
                        <DashboardStatBlockMinimal
                            key={item.id}
                            variant='outline'
                            isAnimated={true}
                            title={item.title}
                            value={item.value.toString()}
                            subtitle={item.subtitle}
                        />
                    ))
                }
            </Stack>
        </Stack>
    </Surface>
}

export default DashboardInsightStatsBlock;