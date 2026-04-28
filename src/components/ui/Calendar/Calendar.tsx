import { useState } from 'react';
import { ChevronLeftCircle, ChevronRightCircle } from 'lucide-react';
import { getCalendarStartDay, getDateToView } from './calendar-utils';
import Surface from '@/components/ui/Surface/Surface';
import './Calendar.css';

// import { useTaskStore } from '@store/useTaskStore';
//* Функция получения дня начала внесения в календарь
// TODO Реализовать передачу data-стейтов

const Calendar: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [calendarViewDate, setCalendarViewDate] = useState(new Date());

    const firstCalendarDay = getCalendarStartDay(calendarViewDate);

    const calendarDays = Array.from({ length: 35 }, (_, i) => {
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
        <Surface variant='glass'>
            <div className="calendar__header">
                <div role='toolbar' className="calendar__header-nav">
                    <ChevronLeftCircle color='var(--neutral-500)' onClick={handleLeftSwitchClick} />
                    <span onClick={() => { }}>{getDateToView(calendarViewDate)}</span>
                    <ChevronRightCircle color='var(--neutral-500)' onClick={handleRightSwitchClick} />
                </div>
                <div className="calendar__week">
                    {
                        ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                            <div key={day} className={
                                `calendar__cell calendar__week-cell ` +
                                `${day === 'Sat' || day === 'Sun' ? 'calendar__week-cell--free' : ''} `}
                            >
                                {day}
                            </div>
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
                        const isOutsideMonth = date.getMonth() !== calendarViewDate.getMonth();

                        return (
                            <div
                                key={index}
                                onClick={() => setSelectedDate(date)}
                                data-date={date.toISOString()}
                                className={`calendar__cell ` +
                                    `${isToday ? 'calendar__cell--today ' : ''}` +
                                    `${isSelected ? 'calendar__cell--selected ' : ''}` +
                                    `${!isCurrentMonth ? 'calendar__cell--other-month ' : ''}` +
                                    `${isWeekend ? 'calendar__cell--free ' : ''}` +
                                    `${isOutsideMonth ? 'calendar__cell--outside-month' : ''}`
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
