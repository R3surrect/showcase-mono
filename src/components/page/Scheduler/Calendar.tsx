import { ChevronLeftCircle, ChevronRightCircle } from 'lucide-react';
import Surface from '@/components/ui/Surface/Surface';
import './Calendar.css';

const Calendar: React.FC = () => {
    // TODO useEffect для фетча data с тасками юзера

    return (
        <Surface>
            <div className="calendar__header">
                <ChevronLeftCircle color='var(--text-menu)' />
                Month
                <ChevronRightCircle color='var(--text-menu)' />
            </div>
            <div className="calendar__content">
                {
                    Array.from({ length: 30 }, (_, i) => (
                        <div className={`calendar__cell`} key={i + 1}>{i + 1}</div>
                    ))
                }
                <div className={`calendar__cell calendar__cell--today`}>31</div>

            </div>
        </Surface>
    );
}

export default Calendar;