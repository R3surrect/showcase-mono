import { DayPicker, type DayPickerProps } from "react-day-picker"
import 'react-day-picker/style.css';
import './Calendar.css';

const defaultProps: DayPickerProps = {
    animate: true,
}

const Calendar = <T extends DayPickerProps>(props: T) =>
    <DayPicker {...defaultProps} {...props} />


export default Calendar;