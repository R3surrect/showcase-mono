// import Calendar from '@/components/ui/Calendar/Calendar.tsx';
import stylesObj from './Scheduler.module.css';

import useTaskStore from '@/store/useTaskStore.ts';

export const Component = () => {
    const tasks = useTaskStore(state => state.tasks);
    const isLoading: boolean = useTaskStore(state => state.isLoading);

    return (
        <div className={stylesObj.scheduler}>
            <div className={stylesObj.container}>
                <div className={stylesObj.tasklist}>
                    {
                        !isLoading && tasks.map(
                            task => (
                                <div key={task.id}>
                                    <div>----------------------------------------------------</div>
                                    <div>title: {task.title}</div>
                                    <div>description: {task.description}</div>
                                    <div>deadline: {new Date(task.deadline).toDateString()}</div>
                                    <div>notifyAt: {new Date(task.notifyAt).toDateString()}</div>
                                    <div>status: {task.status}</div>
                                    <div>createdAt: {new Date(task.createdAt).toDateString()}</div>
                                    <div>updatedAt: {new Date(task.updatedAt).toDateString()}</div>
                                    <div>----------------------------------------------------</div>
                                </div>
                            )
                        )
                    }
                </div>
            </div>
            {/* <Calendar /> */}
        </div>
    )
}
