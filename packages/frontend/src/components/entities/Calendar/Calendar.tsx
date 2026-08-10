import { DayPicker, type DayPickerProps } from "react-day-picker"
import 'react-day-picker/style.css';
import './Calendar.css';
import Surface from "@components/entities/Surface/Surface";

const defaultProps: DayPickerProps = {
    animate: true,
}

const Calendar = <T extends DayPickerProps>(props: T) =>
    <Surface width="max" height="fit" overflow="visible">
        <DayPicker style={{width: '100%'}} {...defaultProps} {...props} />
    </Surface>


export default Calendar;