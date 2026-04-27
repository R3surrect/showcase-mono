export const getDateToView = (date: Date): string => `${date.getFullYear()} ${date.getMonth() + 1}`;
export const getCalendarStartDay = (date: Date): Date => {

    const lastDayPrevMonth = new Date(date.getFullYear(), date.getMonth(), 0);
    const lastMonday = new Date(lastDayPrevMonth);

    lastMonday.setDate(lastDayPrevMonth.getDate() - ((lastDayPrevMonth.getDay() - 1 + 7) % 7));

    return lastMonday;
}