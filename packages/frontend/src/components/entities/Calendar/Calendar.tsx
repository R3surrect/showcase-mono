import { DayPicker, type DayButtonProps, type DayPickerProps } from "react-day-picker"
import 'react-day-picker/style.css';
import './Calendar.css';
import Surface from "@components/entities/Surface/Surface";
import dayjs from "dayjs";
import Text from "../Text/Text";

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

const getMarkColor = (count: number | undefined): string => {
    if (count === undefined) return '';
    if (count < 4) return 'var(--warm-yellow-400)';
    if (count < 7) return 'var(--warm-orange-400)';
    return 'var(--warm-red-400)';
};

const Calendar = (props: CalendarProps) => {
    const { data, ...dayPickerProps } = props;

    const CustomDayButton = (dayProps: DayButtonProps) => {
        const { day, modifiers, ...rest } = dayProps;
        const currentData = data?.find(tasks => dayjs(tasks.deadline).isSame(day.date, 'day'));
        const markColor = getMarkColor(currentData?.count);

        return (
            <button {...rest} style={{ position: "relative" }}>
                {day.date.getDate()}
                {
                    currentData && <div className="hasTasks">
                        <Text
                            size={7}
                            color={modifiers.selected ? 'var(--monochrome-100)' : markColor}
                            weight="bolder"
                        >
                            {currentData.count}
                        </Text>
                    </div>
                }
            </button>
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
