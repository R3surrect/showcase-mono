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
    LucideTrash,
    LucideXCircle
} from "lucide-react";
import { AnimatePresence } from "motion/react";
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
import { motion } from "motion/react"
import type { TaskCardProps } from "@/components/entities/TaskCard/TaskCard.types";
import { useQueryClient } from "@tanstack/react-query";
import { tagsKeys } from "@/queries/tags/tags.query";

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

    const queryClient = useQueryClient();

    const todayTasksCount = tasks.filter(task => dayjs(task.deadline).isSame(dayjs(), 'date')).length;
    const activeMonthTasksCount = tasks.filter(task => dayjs(task.deadline).isSame(dayjs(), 'month')).length;
    // const notifiedTasksCount = tasks.filter(task => dayjs(task.deadline).isSame(dayjs(), 'month')).length;
    // const overdueTasksCount = tasks.filter(task => dayjs(task.deadline).isSame(dayjs(), 'month')).length;

    const aggregatedStatusTagTags = () => {
        const groupedTasksById = Object.groupBy(tasks, task => task.statusTagId);
        const data = Object.keys(groupedTasksById).map((statusTagId) => {
            const query = queryClient.getQueryData([...tagsKeys.all, Number(statusTagId)]);
            console.log(statusTagId);
            console.log(`ID: ${statusTagId}`, query);
            return query;
        })
        console.log(data)
    }

    aggregatedStatusTagTags();

    const stats = [
        {
            id: "stat-today",
            label: `Сегодня: ${todayTasksCount}`,
            icon: LucideCheckCircle,
            color: { h: 42, s: 18, l: 60 },
        },
        {
            id: "stat-active-month",
            label: `${activeMonthTasksCount} активных на месяц`,
            icon: LucideCalendarRange,
            color: { h: 42, s: 18, l: 60 },
        },
        // {
        //     id: "stat-notifications",
        //     label: `${notifiedTasksCount} уведомлений по задачам`,
        //     icon: LucideBell,
        //     color: { h: 36, s: 35, l: 68 },
        // },
        // {
        //     id: "stat-overdue",
        //     label: `${overdueTasksCount} просроченных дедлайна`,
        //     icon: LucideAlertTriangle,
        //     color: { h: 12, s: 35, l: 70 },
        // },
    ] as const;

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

    const renderTask = ({ task }: { task: TaskCardProps }) =>
        <motion.div
            key={task.id}
            layout
            initial={{
                opacity: 0,
                transition: {
                    type: 'tween',
                    duration: 0.40,
                }
            }}
            animate={{ opacity: 1 }}
            exit={{
                opacity: 0,
                transition: {
                    type: 'tween',
                    duration: 0.1,
                }
            }}
        >
            <TaskCard
                onTagDelete={onTaskTagDelete}
                toolbar={renderToolbar(task.id)}
                {...task}
            />
        </motion.div>

    return (
        <>
            <Stack gap="md">
                {
                    !isDismissed &&
                    <Banner
                        isClosable
                        variant="hint"
                        onClose={() => dismiss(hintId)}
                        color='var(--warm-green-500)'
                    >
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
                    {/* //TODO: move to a reusable separate component */}
                    {/* CREATE */}
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

                    {/* DELETED */}
                    <Button
                        size="sm"
                        variant={view === 'deleted' ? "accent" : "outline"}
                        onClick={() => {
                            setSelectedDate(undefined);
                            setView((prev) => view === 'deleted' ? prev : 'deleted');
                        }}
                    >
                        <Stack align="center" direction="row" gap="md">
                            <LucideTrash />
                            Deleted
                        </Stack>
                    </Button>
                </ContentHeader>
                <Stack direction="row" gap="sm" align="center">
                    {
                        stats.map((tag) => {
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
                        <AnimatePresence>
                            {
                                isTasksLoading
                                    ? '...loading'
                                    : filteredTasks.length == 0
                                        ? <Text size={5} color="var(--neutral-850)" weight="bold">No tasks at selected date</Text>
                                        : filteredTasks.map(task => (
                                            renderTask({ task })
                                        ))
                            }
                        </AnimatePresence>
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
                    <TaskCreateForm /*selectedDate={selectedDate}*/ />
                </Surface>
            </Modal>
        </>
    )
}
