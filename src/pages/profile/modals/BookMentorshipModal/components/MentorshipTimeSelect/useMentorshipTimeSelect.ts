import React from 'react';
import { useGetAvailabilityQuery } from '../../../../../../api/mentorship';

export default function useMentorshipTimeSelect(mentorId: string) {
    const [selectedTimeSlotIndex, setSelectedTimeSlotIndex] = React.useState<null | number>(null);
    const { data: availabilityData } = useGetAvailabilityQuery(mentorId);

    const weeklyAvailability = availabilityData?.data.availability.weeklyAvailability;
    console.log('THE WEEKLY AVAILABILITY', weeklyAvailability);

    function onSelectTimeSlot(index: number) {
        setSelectedTimeSlotIndex(index);
    }

    return { weeklyAvailability, selectedTimeSlotIndex, onSelectTimeSlot };
}
