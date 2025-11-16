import './Calendar.css';

const Calendar: React.FC = () => {
    // TODO useEffect для фетча data с тасками юзера
    return (
        <div className='calendar'>
            {Array.from({ length: 31 }, (_, i) => (
                <div key={i + 1}>{i + 1}</div>
            ))}
        </div>
    );
}

export default Calendar;