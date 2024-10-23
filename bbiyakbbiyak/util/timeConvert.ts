export const timeConvert = (hhmmss: string) => {
    const [hoursStr, minutesStr, secondsStr] = hhmmss.split(':');
    let hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);

    const amPm = hours >= 12 ? 'PM' : 'AM';
    const hh = hours % 12 === 0 ? 12 : hours % 12;

    return {
        hh,
        mm: minutes.toString().padStart(2, '0'),
        amPm,
    };
};