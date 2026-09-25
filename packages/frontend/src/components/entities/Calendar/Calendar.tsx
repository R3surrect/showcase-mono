import { DayPicker, type DayButtonProps, type DayPickerProps } from "react-day-picker"
import 'react-day-picker/style.css';
import './Calendar.css';
import Surface from "@components/entities/Surface/Surface";

const defaultProps: DayPickerProps = { animate: true }

const stickyStyles = {
    position: 'sticky',
    alignSelf: 'start',
    top: '0',
} as const;

const CustomDayButton = (dayProps: DayButtonProps) => {
    const { day, modifiers, ...rest } = dayProps;

    return (
        <button {...rest} className={`${rest.className || ''} my-custom-day-btn`}>
            {day.date.getDate()}
        </button>
    );
};

const Calendar = <T extends DayPickerProps>(props: T) => {

    return <div style={stickyStyles}>
        <Surface width="max" height="fit" overflow="visible">
            <DayPicker
                style={{ width: '100%' }}
                components={{ DayButton: CustomDayButton }}
                {...defaultProps}
                {...props}
            />
        </Surface>
    </div>
}

export default Calendar;