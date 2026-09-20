import Banner from "@/components/entities/Banner/Banner"
import Button from "@/components/entities/Button/Button"
import Calendar from "@/components/entities/Calendar/Calendar"
import { ContentHeader } from "@/components/entities/ContentHeader/ContentHeader"
import Grid from "@/components/entities/Grid/Grid"
import Stack from "@/components/entities/Stack/Stack"
import Tag from "@/components/entities/Tag/Tag"
import TaskCard from "@/components/entities/TaskCard/TaskCard"
import Text from "@/components/entities/Text/Text"
import Modal from "@/components/shared/Modal/Modal"
import { useHintStore } from "@/store/useHintStore"
import { LucideAlertTriangle, LucideBell, LucideCalendarRange, LucideCheckCircle, LucidePlusCircle } from "lucide-react"
import { useState } from "react"
import TaskCreateForm from "./create"
import Surface from "@/components/entities/Surface/Surface"
import { useGetTasksQuery } from "@/queries/tasks/task.query"

// #region mock
const MOCK_STAT_TAGS = [
    {
        id: "stat-today",
        label: "Сегодня: 0/1",
        icon: LucideCheckCircle,
        color: { h: 42, s: 18, l: 60 },
    },
    {
        id: "stat-active-month",
        label: "13 активных на месяц",
        icon: LucideCalendarRange,
        color: { h: 42, s: 18, l: 60 },
    },
    {
        id: "stat-notifications",
        label: "4 уведомлений по задачам",
        icon: LucideBell,
        color: { h: 36, s: 35, l: 68 },
    },
    {
        id: "stat-overdue",
        label: "4 просроченных дедлайна",
        icon: LucideAlertTriangle,
        color: { h: 12, s: 35, l: 70 },
    },
] as const;
// #endregion

const hintId = 'scheduler-page-hint';
export const Component = () => {
    const dismiss = useHintStore(store => store.dismissHint);
    const isDismissed = useHintStore(store => store.data[hintId])
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
    const [modalActive, setModalActive] = useState(false);

    const { data: tasks = [], isLoading: isTasksLoading } = useGetTasksQuery();

    return (
        <>
            <Stack gap="md">
                {
                    !isDismissed &&
                    <Banner variant="hint" isClosable onClose={() => dismiss(hintId)} color='var(--warm-green-500)'>
                        <Text color='var(--warm-green-500)' weight='bolder' size={6}>Quick access to the Scheduler:</Text>
                        <Text color='var(--warm-green-500)' size={6} weight='bold'>Clicking on the date on the right or the tags at the top will immediately filter your task feed.</Text>
                    </Banner>
                }
                <ContentHeader
                    title="Планировщик"
                    subElement={<Text color="var(--warm-green-500)">All tasks</Text>}
                >
                    <Button size="sm" onClick={() => setModalActive(true)}>
                        <Stack align="center" direction="row" gap="md">
                            <LucidePlusCircle />
                            Create Task
                        </Stack>
                    </Button>
                </ContentHeader>
                <Stack direction="row" gap="sm" align="center">
                    {
                        MOCK_STAT_TAGS.map((tag) => {
                            const Icon = tag.icon;
                            return (
                                <Tag
                                    key={tag.id}
                                    color={tag.color}
                                    type={'default'}
                                >
                                    <Icon size={16} strokeWidth={3} />
                                    <Text weight="bold" color="var(--neutral-750)">{tag.label}</Text>
                                </Tag>
                            );
                        })}
                </Stack>
                <Grid templateColumns="3fr 1fr">
                    <Stack gap="sm" direction="column">
                        {
                            isTasksLoading ? '...loading'
                                : tasks.map(task => (
                                    <TaskCard key={task.id} {...task}/>
                                ))
                        }
                    </Stack>
                    <Calendar
                        mode="single"
                        onSelect={setSelectedDate}
                        selected={selectedDate}
                    />
                </Grid>
            </Stack>
            <Modal isOpen={modalActive} onClose={() => setModalActive(false)}>
                <Surface height='fit' width='50vw'>
                    <TaskCreateForm selectedDate={selectedDate} />
                </Surface>
            </Modal>
        </>
    )
}
