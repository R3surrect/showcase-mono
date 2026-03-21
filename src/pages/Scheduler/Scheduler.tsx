import Calendar from '@/components/page/Scheduler/Calendar/Calendar';
import './Scheduler.css';

import useTaskStore from '@/store/useTaskStore';
// import { useEffect } from 'react';

export const Component = () => {
    const tasks = useTaskStore(state => state.tasks);
    const isLoading: boolean = useTaskStore(state => state.isLoading);

    return (
        <div className='scheduler'>
            <div className="task-list">
                <div className="task-list__task">
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
            <Calendar />
        </div>
    )
}
