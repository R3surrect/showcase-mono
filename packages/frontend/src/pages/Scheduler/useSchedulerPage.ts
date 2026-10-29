import { useHintStore } from "@/store/useHintStore";
import { useState } from "react";
import { hintId } from "./Scheduler.constants";
import { useDeleteTaskQuery, useGetTasksQuery, useUpdateTaskQuery } from "@/queries/tasks/task.query";
import dayjs from "dayjs";
import type { TaskTagAction, Views } from "./Scheduler.types";

const useSchedulerPage = () => {
    const dismiss = useHintStore(store => store.dismissHint);
    const isDismissed = useHintStore(store => store.data[hintId])
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();
    const [modalActive, setModalActive] = useState(false);

    const {
        data: tasks = [],
        isLoading: isTasksLoading
    } = useGetTasksQuery();
    
    const { mutate: updateTask, variables: updateTaskVariables, isPending: isUpdateTaskPending } = useUpdateTaskQuery();
    const { mutate: deleteTask, variables: deleteTaskVariables, isPending: isDeleteTaskPending } = useDeleteTaskQuery();

    const hasTasksForSelectedDate = tasks.some(task => {
        if (!task.deadline || !selectedDate) return false;
        return dayjs(task.deadline).isSame(selectedDate, 'day');
    });

    const [view, setView] = useState<Views>(() => !hasTasksForSelectedDate ? 'inbox' : 'all');

    const filteredTasks = tasks.filter(task => {
        if (view === 'inbox') return !task.deadline && !task.isArchived;
        // if (view === 'all') return !task.isArchived && !task.isDeleted;
        if (view === 'all') return !task.isArchived;
        if (view === 'archived') return task.isArchived;
        
        if (!task.deadline) return false;
        if (!selectedDate) return true;

        return dayjs(task.deadline).isSame(selectedDate, 'day');
    });

    const grouped = Object.groupBy(tasks, item => item.deadline ? dayjs(item.deadline).format('YYYY-MM-DD') : '');
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
        onTaskTagDelete
    }
}

export default useSchedulerPage