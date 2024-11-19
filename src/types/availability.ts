interface TimeSlot {
    start: string;
    end: string;
}

interface DailyAvailability {
    availability: {
        dayOfWeek: string;
        timeSlots: TimeSlot[];
    };
}

interface ProfileAvailability {
    availability: {
        id: string;
        profileId: string;
        availability: DailyAvailability[];
        weeklyAvailability: DailyAvailability[];
        timeZone: string;
        createdAt: string;
        updatedAt: string;
    };
}

export interface ProfileAvailabilityResponse {
    status: string;
    message: string;
    data: ProfileAvailability;
}
