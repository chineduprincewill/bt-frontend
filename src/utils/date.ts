import { format, differenceInDays, isThisWeek, isToday, isYesterday } from 'date-fns';
export default class DateUtil {
    static extractDateFromISOString(ISOString: string) {
        try {
            const dateObject = new Date(ISOString);
            const extractedDate = dateObject.toISOString().split('T')[0];
            return extractedDate;
        } catch (error) {
            return null;
        }
    }

    static getYearFromISOString(ISOString: string) {
        try {
            const dateObject = new Date(ISOString);
            const year = dateObject.getFullYear();
            return year;
        } catch (error) {
            return null;
        }
    }
}

export const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    let formattedDate = format(date, 'PPPP');

    if (isToday(date)) {
        formattedDate = `Today at ${format(date, 'p')}`;
    } else if (isYesterday(date)) {
        formattedDate = `Yesterday at ${format(date, 'p')}`;
    }

    return formattedDate;
};

export function formatTheDate(dateStr: string) {
    const date = new Date(dateStr);
    const now = new Date();
    const diffDays = differenceInDays(now, date);

    if (diffDays === 0) {
        // return 'today';
        return `Today at ${format(date, 'h:mm a')}`;
    } else if (diffDays === 1) {
        return '1 day ago';
    } else if (diffDays < 7) {
        return `${diffDays} days ago`;
    } else if (isThisWeek(date, { weekStartsOn: 1 })) {
        return 'a week ago';
    } else {
        return format(date, 'dd MMM');
    }
}
