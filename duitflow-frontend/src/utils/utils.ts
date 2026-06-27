export function formatTaskDate(date?: string) {
    if (!date) return '';

    const [year, month, day] = date.split('-');

    return `${monthName(parseInt(month))} ${day}st, ${year}`;
}

export function monthName(month: number): string {
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[month - 1];
}