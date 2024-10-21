export const stringToDate = (hhmmss: string) => {
    const [hours, minutes, seconds] = hhmmss.split(':').map(Number);

    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds);
    date.setMilliseconds(0);

    return date;
};