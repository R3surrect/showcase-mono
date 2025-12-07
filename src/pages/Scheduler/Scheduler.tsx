import Calendar from '@/components/page/Scheduler/Calendar/Calendar';
import './Scheduler.css';

// import useTaskStore from '@/store/useTaskStore';

const Scheduler = () => {
    return (
        <div className='scheduler'>
            <div className="task-list">
                <div className="task-list__task"></div>
            </div>
            <Calendar />
        </div>
    )
}


export default Scheduler;