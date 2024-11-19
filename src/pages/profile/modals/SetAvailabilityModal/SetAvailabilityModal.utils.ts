import { toast } from 'react-toastify';
import { IAvailabilityFormValue, ISetAvailabilityRequest } from '../../../../types/mentorship';

export function validateAvailabilityForm(availabilityForm: IAvailabilityFormValue[]) {
    for (let i = 0; i < availabilityForm.length; i++) {
        const day = availabilityForm[i];
        const timeSlots = day.timeSlots;

        for (let j = 0; j < timeSlots.length; j++) {
            const timeSlot1 = timeSlots[j];

            for (let k = j + 1; k < timeSlots.length; k++) {
                const timeSlot2 = timeSlots[k];

                if (timeSlot1.start < timeSlot2.end && timeSlot2.start < timeSlot1.end) {
                    toast.error(`Time slots for ${day.dayOfWeek} clash`);
                    return false;
                }
            }
        }
    }

    return true;
}

export function ParseSetAvailabilityRequest(availabilityForm: IAvailabilityFormValue[]): ISetAvailabilityRequest {
    return {
        weeklyAvailability: availabilityForm.map((availableDay) => ({
            dayOfWeek: availableDay.dayOfWeek,
            timeSlots: availableDay.timeSlots.map((time) => ({ start: convertTimeToHHMMSS(time.start), end: convertTimeToHHMMSS(time.end) })),
        })),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
}

function convertTimeToHHMMSS(time: string) {
    // Split the time string into hours and minutes
    const [hoursStr, minutesStr] = time.split(':');

    // Convert hours and minutes to numbers
    const hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);

    // Ensure the time is in 24-hour format
    if (hours >= 24 || minutes >= 60) {
        throw new Error('Invalid time format');
    }

    // Pad single-digit hours and minutes with leading zeros
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');

    // Return the time in HH:mm:ss format (with seconds set to 00)
    return `${formattedHours}:${formattedMinutes}:00`;
}
