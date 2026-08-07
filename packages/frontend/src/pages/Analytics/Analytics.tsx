import Grid from '@/components/entities/Grid/Grid'
import DashboardStatBlockFull from '@/components/entities/dashboards/DashboardStatBlockFull/DashboardStatBlockFull';
import DashboardActivityBlock from '@/components/entities/dashboards/DashboardActivityBlock/DashboardActivityBlock';
import DashboardPieStatsBlock from '@/components/entities/dashboards/DashboardPieStatsBlock/DashboardPieStatsBlock';
import Stack from '@/components/entities/Stack/Stack';
import DashboardTaskPriorityBlock from '@/components/entities/dashboards/DashboardTaskPriorityBlock/DashboardTaskPriorityBlock';
import DashboardProjectLoadBlock from '@/components/entities/dashboards/DashboardProjectLoadBlock/DashboardProjectLoadBlock';
import DashboardInsightStatsBlock from '@/components/entities/dashboards/DashboardInsightStatsBlock/DashboardInsightStatsBlock';
import { dashboardStatMock } from './Analytics.constants';
import Banner from '@/components/entities/Banner/Banner';
import { useHintStore } from '@/store/useHintStore';
import Text from '@/components/entities/Text/Text';

const hintId = `analytics-page-hint`;
export const Component = () => {
    const dismiss = useHintStore(store => store.dismissHint);
    const isDismissed = useHintStore(store => store.data[hintId]);
    return (
        <Stack gap='md'>
            {
                !isDismissed &&
                <Banner variant='hint' onClose={() => dismiss(hintId)} width='max'>
                    <Text size={6}>Нажмите на любую карточку или график, чтобы увидеть детализацию — какие именно задачи формируют этот показатель</Text>
                </Banner>
            }
            <Grid
                columns={4}
                alignItems='stretch'
                height='fit'
                autoRows='1fr'
            >
                {
                    dashboardStatMock.map(item => (
                        <DashboardStatBlockFull {...item} isAnimated={true} key={item.id} />
                    ))
                }
            </Grid>

            <Grid columns={2} alignItems='start' height='fit'>
                <DashboardActivityBlock />
                <DashboardPieStatsBlock />
            </Grid>

            <DashboardProjectLoadBlock />
            <DashboardTaskPriorityBlock />

            <DashboardInsightStatsBlock />
        </Stack>
    )
}
