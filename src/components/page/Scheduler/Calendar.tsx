import { ChevronLeftCircle, ChevronRightCircle } from 'lucide-react';
import Surface from '@/components/ui/Surface/Surface';
import './Calendar.css';
import { useState } from 'react';

const getDaysInMonth = (year: number, month: number): number => new Date(year, month + 1, 0).getDate();
const getParameterizedDate = (year: number, month: number, day: number): Date => new Date(year, month, day);
const getDateToView = (date: Date): string => `${date.getFullYear()} ${date.getMonth()}`;

const Calendar: React.FC = () => {
    // TODO useEffect для фетча data с тасками юзера -> при клике вызов availableTasks с отображением в контентном блоке
    const [selectedDate, setSelectedDate] = useState(new Date());
    const today = new Date();

    return (
        <Surface>
            <div className="calendar__header">
                <div role='toolbar' className="calendar__header-nav">
                    <ChevronLeftCircle color='var(--text-menu)' />
                    {getDateToView(selectedDate)}
                    <ChevronRightCircle color='var(--text-menu)' />
                </div>
                <div className="calendar__week">
                    {
                        ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                            <div key={day} className={`calendar__cell calendar__week-cell ${day === 'Sat' || day === 'Sun' ? 'calendar__week-cell--free' : ''}`}>{day}</div>
                        ))
                    }
                </div>
            </div>
            <div className="calendar__content">
                <div className='calendar__cell'></div>
                <div className='calendar__cell'></div>
                <div className='calendar__cell'></div>
                <div className='calendar__cell'></div>
                <div className='calendar__cell'></div>
                {
                    Array.from({ length: getDaysInMonth(selectedDate.getFullYear(), selectedDate.getMonth()) }, (_, i) => (
                        <div className={
                            `calendar__cell 
                            ${today.getDate() === (i + 1) ? 'calendar__cell--today ' : ''}` +
                            `${selectedDate.getDate() === (i + 1) ? 'calendar__cell--selected   ' : ''}` +
                            `${getParameterizedDate(today.getFullYear(), today.getMonth(), i + 1).getDay() === 0 ||
                                getParameterizedDate(today.getFullYear(), today.getMonth(), i + 1).getDay() === 6 ?
                                'calendar__cell--free' : ''
                            }`
                        } key={i + 1}
                            onClick={() => {
                                setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i + 1));
                            }}
                            data-date={new Date(selectedDate.getFullYear(), selectedDate.getMonth(), (i + 1)).toISOString()}>
                            {i + 1}
                        </div>
                    ))
                }
            </div>
        </Surface>
    );
}

export default Calendar;