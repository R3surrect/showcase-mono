import { DayPicker, type DayButtonProps, type DayPickerProps } from "react-day-picker"
import 'react-day-picker/style.css';
import './Calendar.css';
import Surface from "@components/entities/Surface/Surface";

const defaultProps: DayPickerProps = { animate: true }

export interface CalendarData {
    deadline: Date;
    count: number;
}

type CalendarProps = DayPickerProps & (
    | { data: CalendarData[] }
    | { data?: never }
);

const stickyStyles = {
    position: 'sticky',
    alignSelf: 'start',
    top: '0',
} as const;


const Calendar = (props: CalendarProps) => {
    const { data, ...dayPickerProps } = props;

    const CustomDayButton = (dayProps: DayButtonProps) => {
        const { day, ...rest } = dayProps;

        return (
            <button {...rest}>{day.date.getDate()}</button>
        );
    };

    return (
        <div style={stickyStyles}>
            <Surface width="max" height="fit" overflow="visible">
                <DayPicker
                    style={{ width: '100%' }}
                    components={{ DayButton: CustomDayButton }}
                    {...defaultProps}
                    {...dayPickerProps}
                />
            </Surface>
        </div>
    );
};

export default Calendar;
