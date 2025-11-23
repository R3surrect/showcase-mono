import { useEffect, useState } from 'react';
import { ChevronLeftCircle, ChevronRightCircle } from 'lucide-react';
import Surface from '@/components/ui/Surface/Surface';
import './Calendar.css';

const getDateToView = (date: Date): string => `${date.getFullYear()} ${date.getMonth() + 1}`;

//* Функция получения дня начала внесения в календарь
const getCalendarCells = (date: Date): Date => {

    const lastDayPrevMonth = new Date(date.getFullYear(), date.getMonth(), 0);
    const lastMonday = new Date(lastDayPrevMonth);

    lastMonday.setDate(lastDayPrevMonth.getDate() - ((lastDayPrevMonth.getDay() - 1 + 7) % 7));

    return lastMonday;
}


const Calendar: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [calendarViewDate, setCalendarViewDate] = useState(new Date());

    const firstCalendarDay = getCalendarCells(selectedDate);

    //debug
    useEffect(() => {
        console.debug('calendarViewDate: ' + calendarViewDate);
        console.debug('selectedDate: ' + selectedDate);
    }, [calendarViewDate, selectedDate]);

    const calendarDays = Array.from({ length: 42 }, (_, i) => {
        const currentDate = new Date(firstCalendarDay);
        currentDate.setDate(firstCalendarDay.getDate() + i);
        return currentDate;
    });

    const handleLeftSwitchClick = () => {
        setCalendarViewDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
    }

    const handleRightSwitchClick = () => {
        setCalendarViewDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
    }

    return (
        <Surface className='calendar__surface'>
            <div className="calendar__header">
                <div role='toolbar' className="calendar__header-nav">
                    <ChevronLeftCircle color='var(--text-menu)' onClick={() => { handleLeftSwitchClick() }} />
                    <span onClick={() => { }}>{getDateToView(selectedDate)}</span>
                    <ChevronRightCircle color='var(--text-menu)' onClick={() => { handleRightSwitchClick() }} />
                </div>
                <div className="calendar__week">
                    {
                        ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                            <div key={day} className={
                                `calendar__cell calendar__week-cell ${day === 'Sat' || day === 'Sun' ? 'calendar__week-cell--free' : ''}`}>{day}</div>
                        ))
                    }
                </div>
            </div>
            <div className="calendar__content">
                {
                    calendarDays.map((date, index) => {
                        const isCurrentMonth = date.getMonth() === selectedDate.getMonth();
                        const isToday = date.toDateString() === new Date().toDateString();
                        const isSelected = date.toDateString() === selectedDate.toDateString();
                        const isWeekend = date.getDay() === 0 || date.getDay() === 6;

                        return (
                            <div
                                key={index}
                                onClick={() => setSelectedDate(date)}
                                data-date={date.toISOString()}
                                className={`calendar__cell ` +
                                    `${isToday ? 'calendar__cell--today ' : ''}` +
                                    `${isSelected ? 'calendar__cell--selected ' : ''}` +
                                    `${!isCurrentMonth ? 'calendar__cell--other-month ' : ''}` +
                                    `${isWeekend ? 'calendar__cell--free ' : ''}`
                                }
                            >
                                {date.getDate()}
                            </div>
                        );
                    })
                }
            </div>
        </Surface>
    );
}

export default Calendar;