import { useHintStore } from "@/store/useHintStore";
import { useState } from "react";
import { hintId } from "./Scheduler.constants";
import { useDeleteTaskQuery, useGetTasksQuery, useUpdateTaskQuery } from "@/queries/tasks/task.query";
import dayjs, { Dayjs } from "dayjs";
import type { TaskTagAction, Views } from "./Scheduler.types";
import { LucideCalendarRange, LucideCheckCircle, LucideListTodo } from "lucide-react";
import { useGetTagsQuery } from "@/queries/tags/tags.query";
import { DEFAULT_HSL_COLOR } from "@/components/entities/_shared/system.constants";
import { colord } from "colord";

const useSchedulerPage = () => {
    const dismiss = useHintStore(store => store.dismissHint);
    const isDismissed = useHintStore(store => store.data[hintId])
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
    const [modalActive, setModalActive] = useState(false);

    const {
        data: tasks = [],
        isLoading: isTasksLoading
    } = useGetTasksQuery();

    const today = dayjs();

    const { mutate: updateTask, variables: updateTaskVariables, isPending: isUpdateTaskPending } = useUpdateTaskQuery();
    const { mutate: deleteTask, variables: deleteTaskVariables, isPending: isDeleteTaskPending } = useDeleteTaskQuery();
    const { data: tags, isLoading: isTagsLoading } = useGetTagsQuery();

    const hasTasksForDate = (date: Dayjs | Date) => tasks.some(task => {
        if (!task.deadline || date) return false;
        return dayjs(task.deadline).isSame(selectedDate, 'day');
    });

    const [view, setView] = useState<Views>(() => hasTasksForDate(today) ? 'date' : 'inbox');

    // const [view, setView] = useState<Views>(() => !hasTasksForSelectedDate ? 'inbox' : 'all');

    const filteredTasks = tasks.filter(task => {
        if (view === 'inbox') return !task.deadline && !task.isArchived;
        // if (view === 'all') return !task.isArchived && !task.isDeleted;
        if (view === 'all') return !task.isArchived;
        if (view === 'archived') return task.isArchived;

        if (!task.deadline) return false;
        if (!selectedDate) return true;

        return dayjs(task.deadline).isSame(selectedDate, 'day');
    });

    const grouped = Object.groupBy(tasks, item => {
        return !item.isArchived && item.deadline
            ? dayjs(item.deadline).format('YYYY-MM-DD')
            : ''
    });

    const calendarData = Object.keys(grouped).map((key) => ({
        deadline: new Date(key),
        count: grouped[key]?.length ?? 0
    }))

    const onTaskTagDelete: TaskTagAction = (taskId, tagId) => {
        const mutatedTask = tasks.find((item) => item.id === taskId);
        const mutatedTags = mutatedTask?.tags.filter(tag => tag.id !== tagId);

        updateTask({
            id: taskId,
            tagIds: mutatedTags?.map(tag => tag.id)
        })
    }

    const todayTasksCount = tasks.filter(task => dayjs(task.deadline).isSame(dayjs(), 'date')).length;
    const activeMonthTasksCount = tasks.filter(task => dayjs(task.deadline).isSame(dayjs(), 'month')).length;
    // const notifiedTasksCount = tasks.filter(task => dayjs(task.deadline).isSame(dayjs(), 'month')).length;
    // const overdueTasksCount = tasks.filter(task => dayjs(task.deadline).isSame(dayjs(), 'month')).length;

    const getAggregatedStatusTagTags = () => {
        const groupedTasksById = Object.groupBy(tasks, task => task.statusTagId);

        const foundTags = Object.keys(groupedTasksById).map((statusTagId) => tags?.find(item => item.id === Number(statusTagId)))

        return foundTags.map(tag => {
            const tasksCount = tag ? (groupedTasksById[tag.id]?.length || 0) : 0;

            return ({
                id: `tid${tag?.id}_tc${tasksCount}`,
                icon: LucideListTodo,
                label: `Задач со статусом "${tag?.label}": ${tasksCount}`,
                color: colord(tag?.color ?? DEFAULT_HSL_COLOR.color).saturate(-0.01).toHsl(),
            })
        })
    }

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
        ...(!isTagsLoading ? getAggregatedStatusTagTags() : []),
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

    return {
        dismiss,
        isDismissed,
        selectedDate,
        setSelectedDate,
        modalActive,
        setModalActive,
        tasks,
        isTasksLoading,
        updateTask,
        updateTaskVariables,
        isUpdateTaskPending,
        deleteTask,
        deleteTaskVariables,
        isDeleteTaskPending,
        view,
        setView,
        filteredTasks,
        calendarData,
        onTaskTagDelete,
        getAggregatedStatusTagTags,
        stats,
    }
}

export default useSchedulerPage