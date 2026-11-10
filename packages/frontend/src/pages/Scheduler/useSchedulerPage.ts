import { useState } from "react";
import { colord } from "colord";
import dayjs, { Dayjs } from "dayjs";
import {
    LucideCalendarRange,
    LucideCheckCircle,
    LucideListTodo,
} from "lucide-react";
import { hintId } from "./Scheduler.constants";
import { useHintStore } from "@/store/useHintStore";
import { useGetTagsQuery } from "@/queries/tags/tags.query";
import type { StatTag, StatViewTypes, TaskTagAction, Views } from "./Scheduler.types";
import { DEFAULT_HSL_COLOR } from "@/components/entities/_shared/system.constants";
import { useDeleteTaskQuery, useGetTasksQuery, useUpdateTaskQuery } from "@/queries/tasks/task.query";
import { createUnionGuard } from "@showcase-mono/backend/shared/guards";

const useSchedulerPage = () => {
    const dismiss = useHintStore(store => store.dismissHint);
    const isDismissed = useHintStore(store => store.data[hintId])
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();
    const [modalActive, setModalActive] = useState(false);

    const {
        data: tasks = [],
        isLoading: isTasksLoading
    } = useGetTasksQuery();

    const today = dayjs();
    const [statView, setStatView] = useState<StatViewTypes>('month');

    const { mutate: updateTask, variables: updateTaskVariables, isPending: isUpdateTaskPending } = useUpdateTaskQuery();
    const { mutate: deleteTask, variables: deleteTaskVariables, isPending: isDeleteTaskPending } = useDeleteTaskQuery();
    const { data: tags, isLoading: isTagsLoading } = useGetTagsQuery();

    const hasTasksForDate = (date: Dayjs | Date) => tasks.some(task => {
        if (!task.deadline || !date) return false;
        return dayjs(task.deadline).isSame(date, 'day');
    });

    const [view, setView] = useState<Views>(() => {
        if (hasTasksForDate(today)) {
            setSelectedDate(today.toDate())
            return 'date';
        }
        return 'inbox'
    });

    const filteredTasks = tasks.filter(task => {
        if (view === 'inbox') return !task.deadline && !task.isArchived;
        // if (view === 'all') return !task.isArchived && !task.isDeleted;
        if (view === 'all') return !task.isArchived;
        if (view === 'archived') return task.isArchived;

        if (!task.deadline) return false;
        if (!selectedDate) return true;

        return dayjs(task.deadline).isSame(selectedDate, 'day');
    });

    const onTaskTagDelete: TaskTagAction = (taskId, tagId) => {
        const mutatedTask = tasks.find((item) => item.id === taskId);
        const mutatedTags = mutatedTask?.tags.filter(tag => tag.id !== tagId);
        
        updateTask({
            id: taskId,
            tagIds: mutatedTags?.map(tag => tag.id)
        })
    }

    const tasksCount = tasks.filter(task => dayjs(task.deadline).isSame(dayjs(), statView)).length;
    
    const grouped = Object.groupBy(tasks, item => {
        return !item.isArchived && item.deadline
            ? dayjs(item.deadline).format('YYYY-MM-DD')
            : ''
    });

    const calendarData = Object.keys(grouped).map((key) => ({
        deadline: new Date(key),
        count: grouped[key]?.length ?? 0
    }))

    function getAggregatedStatusTagTags() {
        const groupedTasksById = Object.groupBy(tasks, task => task.statusTagId);
        const foundTags = Object.keys(groupedTasksById).map((statusTagId) => tags?.find(item => item.id === Number(statusTagId)))

        return foundTags.map(tag => {
            const tasksCount = tag ? (groupedTasksById[tag.id]?.length || 0) : 0;
            const statObj: StatTag = {
                id: `tid${tag?.id}_tc${tasksCount}`,
                icon: LucideListTodo,
                label: `${tag?.label}: ${tasksCount}`,
                color: colord(tag?.color ?? DEFAULT_HSL_COLOR.color).saturate(-0.3).toHsl(),
            };

            return statObj;
        })
    }

    const stats: StatTag[] = [
        {
            id: "stat-today",
            label: `${statView[0].toUpperCase()}${statView.slice(1)}: ${tasksCount}`,
            icon: LucideCheckCircle,
            color: { h: 42, s: 18, l: 60 },
        },
        ...(
            !isTagsLoading
                ? getAggregatedStatusTagTags().sort((statA, statB) => {
                    const distA = statA.color.h > 180 ? 360 - statA.color.h : statA.color.h;
                    const distB = statB.color.h > 180 ? 360 - statB.color.h : statB.color.h;

                    return distA - distB;
                })
                : []
        ),
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
        stats,
        statView,
        setStatView,
    }
}

export default useSchedulerPage