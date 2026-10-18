import dayjs from "dayjs";
import "dayjs/locale/ru";
import {
    LucideAlertTriangle,
    LucideArchive,
    LucideArchiveRestore,
    LucideBell,
    LucideCalendarRange,
    LucideCalendarX,
    LucideCheckCircle,
    LucideInbox,
    LucidePlusCircle,
    LucideXCircle
} from "lucide-react";
import Banner from "@/components/entities/Banner/Banner";
import Button from "@/components/entities/Button/Button";
import Calendar from "@/components/entities/Calendar/Calendar";
import { ContentHeader } from "@/components/entities/ContentHeader/ContentHeader";
import Grid from "@/components/entities/Grid/Grid";
import Stack from "@/components/entities/Stack/Stack";
import Tag from "@/components/entities/Tag/Tag";
import TaskCard from "@/components/entities/TaskCard/TaskCard";
import Text from "@/components/entities/Text/Text";
import Modal from "@/components/shared/Modal/Modal";
import TaskCreateForm from "./create";
import Surface from "@/components/entities/Surface/Surface";
import useSchedulerPage from "./useSchedulerPage";
import { hintId } from "./Scheduler.constants";

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

export const Component = () => {

    const {
        dismiss,
        isDismissed,
        selectedDate,
        setSelectedDate,
        modalActive,
        setModalActive,
        tasks,
        isTasksLoading,
        updateTask,
        deleteTask,
        view,
        setView,
        filteredTasks,
        calendarData,
        onTaskTagDelete
    } = useSchedulerPage();

    const renderToolbar = (taskId: number) => {
        const task = tasks.find(task => task.id === taskId);

        return <>
            <Button variant="transparent" size="none" onClick={() => updateTask({ id: taskId, isArchived: !task?.isArchived })} >
                {
                    task?.isArchived
                        ? <LucideArchiveRestore fill="white" stroke="var(--warm-orange-400)" size={18} />
                        : <LucideArchive fill="var(--warm-orange-400)" stroke="white" size={18} />
                }
            </Button>
            <Button variant="transparent" size="none" onClick={() => deleteTask({ id: taskId })}>
                <LucideXCircle color="var(--warm-red-400)" size={18} />
            </Button>
        </>
    }

    return (
        <>
            <Stack gap="md">
                {
                    !isDismissed &&
                    <Banner variant="hint" isClosable onClose={() => dismiss(hintId)} color='var(--warm-green-500)'>
                        <Text
                            color='var(--warm-green-500)'
                            weight='bolder'
                            size={6}
                        >
                            Quick access to the Scheduler:
                        </Text>
                        <Text
                            color='var(--warm-green-500)'
                            size={6}
                            weight='bold'
                        >
                            Clicking on the date on the right or the tags at the top will immediately filter your task feed.
                        </Text>
                    </Banner>
                }
                <ContentHeader
                    title={selectedDate ? `Задачи на ${dayjs(selectedDate).locale('ru').format('DD MMMM YYYY')}` : 'Планировщик'}
                    subElement={<Text color="var(--warm-green-500)">All tasks</Text>}
                >

                    {/* CREATE TASK */}
                    <Button size="sm" onClick={() => setModalActive(true)}>
                        <Stack align="center" direction="row" gap="md">
                            <LucidePlusCircle />
                            Create Task
                        </Stack>
                    </Button>

                    {/* ALL */}
                    <Button
                        size="sm"
                        variant={view === 'all' ? "accent" : "outline"}
                        onClick={() => {
                            setView('all');
                            setSelectedDate(undefined)
                        }}
                    >
                        <Stack align="center" direction="row" gap="md">
                            <LucideCalendarX />
                            All tasks
                        </Stack>
                    </Button>

                    {/* ARCHIVE */}
                    <Button
                        size="sm"
                        variant={view === 'archived' ? "accent" : "outline"}
                        onClick={() => {
                            setSelectedDate(undefined);
                            setView((prev) => view === 'archived' ? prev : 'archived');
                        }}
                    >
                        <Stack align="center" direction="row" gap="md">
                            <LucideArchive />
                            Archive
                        </Stack>
                    </Button>

                    {/* INBOX */}
                    <Button
                        size="sm"
                        variant={view === 'inbox' ? "accent" : "outline"}
                        onClick={() => {
                            setSelectedDate(undefined);
                            setView((prev) => view === 'inbox' ? prev : 'inbox');
                        }}
                    >
                        <Stack align="center" direction="row" gap="md">
                            <LucideInbox />
                            Inbox
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
                            isTasksLoading
                                ? '...loading'
                                : filteredTasks.length == 0
                                    ? <Text size={5} color="var(--neutral-850)" weight="bold">No tasks at selected date</Text>
                                    : filteredTasks.map(task => (
                                        <TaskCard
                                            key={task.id}
                                            onTagDelete={onTaskTagDelete}
                                            toolbar={renderToolbar(task.id)}
                                            {...task}
                                        />
                                    ))
                        }
                    </Stack>
                    <Calendar
                        data={calendarData}
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => {
                            setSelectedDate(date);
                            setView('date');
                        }}
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
