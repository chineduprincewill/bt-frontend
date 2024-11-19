import { ISetAvailabilityResponse } from './../../../../../../types/mentorship';
// export function validateDateSelect(date: Date, availability: Partial<ISetAvailabilityResponse>) {
//     // Get day of the week index from date
//     const dayIndex = date.getDay();

//     // Get todays date
//     const today = new Date();

//     //     User has time slots for the day and is after today
//     return !!availability.weeklyAvailability?.[dayIndex]?.timeSlots?.length && date >= today;
// }

export function validateDateSelect(date: Date, startDate: Date, endDate: Date, availability: Partial<ISetAvailabilityResponse>) {
    // Get day of the week index from date
    const dayIndex = date.getDay();


    const isDateInRange = date >= startDate && date <= endDate;

    // Check if user has time slots for the day and is within the allowed date range
    return isDateInRange && !!availability.weeklyAvailability?.[dayIndex]?.timeSlots?.length;
}
