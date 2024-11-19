import { ISetAvailabilityResponse } from '../../../../../../types/mentorship';

export const DUMMMY_AVAILABILITY: Partial<ISetAvailabilityResponse> = {
    weeklyAvailability: [
        {
            dayOfWeek: 'Monday',
            timeSlots: [
                {
                    start: '10:00',
                    end: '11:00',
                },
                {
                    start: '11:00',
                    end: '12:00',
                },
            ],
        },
        {
            dayOfWeek: 'Tuesday',
            timeSlots: [
                {
                    start: '10:00',
                    end: '11:00',
                },
                {
                    start: '11:00',
                    end: '12:00',
                },
            ],
        },
    ],
};
