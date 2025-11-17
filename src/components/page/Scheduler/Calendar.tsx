import Surface from '@/components/ui/Surface/Surface';
import './Calendar.css';

const Calendar: React.FC = () => {
    // TODO useEffect для фетча data с тасками юзера

    return (
        <Surface>
            <div className="calendar__header">
                Month
            </div>
            <div className="calendar__content">
                {Array.from({ length: 31 }, (_, i) => (
                    <div className='calendar__cell' key={i + 1}>{i + 1}</div>
                ))}
            </div>
        </Surface>
    );
}

export default Calendar;