import { DayPicker, type DayPickerProps } from "react-day-picker"
import 'react-day-picker/style.css';
import './Calendar.css';
import Surface from "@components/entities/Surface/Surface";

const defaultProps: DayPickerProps = { animate: true }

const stickyStyles = {
    position: 'sticky',
    alignSelf: 'start',
    top: '0',
} as const;

const Calendar = <T extends DayPickerProps>(props: T) =>
    <div style={stickyStyles}>
        <Surface width="max" height="fit" overflow="visible">
            <DayPicker style={{ width: '100%' }} {...defaultProps} {...props} />
        </Surface>
    </div>

export default Calendar;