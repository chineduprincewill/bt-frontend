import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    useGetSingleMentorshipRequestQuery,
    useUpdateMentorshipRequestMutation,
    useDeclineMentorshipRequestMutation,
    useCancelMentorshipAsMenteeMutation,
} from '../../../../api/mentorship';
import { useGetLoggedInUserInfoQuery } from 'api/userApi';
import { toast } from 'react-toastify';

export default function useMentorshipBooking() {
    const [searchText, setSearchText] = useState('');
    const { id } = useParams();

    const { data: singleMentorshipData, isLoading } = useGetSingleMentorshipRequestQuery(id!);

    const [updateMentorshipRequest, { isLoading: updateLoading }] = useUpdateMentorshipRequestMutation();
    const [declineMentorshipRequest, { isLoading: declineLoading }] = useDeclineMentorshipRequestMutation();
    const [cancelMentorship, { isLoading: cancelLoading }] = useCancelMentorshipAsMenteeMutation();

    const { data: loggedInUserData } = useGetLoggedInUserInfoQuery(null);

    const isExecutive = loggedInUserData?.data.user.role.name === 'executive';

    const singleMentorship = singleMentorshipData?.data;
    console.log('Mentorship data -single', singleMentorship);

    function formatDuration(minutes: number) {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        const hourPart = hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''}` : '';
        const minutePart = remainingMinutes > 0 ? `${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}` : '';

        if (hours > 0 && remainingMinutes > 0) {
            return `${hourPart} and ${minutePart}`;
        } else if (hours > 0) {
            return hourPart;
        } else if (remainingMinutes > 0) {
            return minutePart;
        } else {
            return 'Less than a minute';
        }
    }

    const mentor = singleMentorship?.mentorship.mentor.user.firstName + ' ' + singleMentorship?.mentorship.mentor.user.lastName;

    const handleUpdateMentorshipRequest = async () => {
        try {
            await updateMentorshipRequest({
                mentorshipRequestId: id,
                chosenTime: singleMentorship?.chosenTime,
                chosenDate: singleMentorship?.chosenDate,
                reason: '',
                status: 'Accepted',
            }).unwrap();
            toast.success('Mentorship request accepted');
        } catch (error) {
            toast.error('Failed to accept mentorship request');
        }
    };

    const handleStallMentorshipRequest = async () => {
        try {
            await updateMentorshipRequest({ id, status: 'Stalled' }).unwrap();
            toast.success('Mentorship request stalled');
        } catch (error) {
            toast.error('Failed to stall mentorship request');
        }
    };

    const handleDeclineMentorshipRequest = async () => {
        try {
            await declineMentorshipRequest({
                mentorshipRequestId: id,
                chosenTime: singleMentorship?.chosenTime,
                chosenDate: singleMentorship?.chosenDate,
                reason: '',
                status: 'Declined',
            }).unwrap();
            toast.success('Mentorship request declined');
        } catch (error) {
            toast.error('Failed to decline mentorship request');
        }
    };

    const handleCancelMentorshipAsMentee = async () => {
        try {
            await cancelMentorship(id!).unwrap();
            toast.success('Mentorship request cancelled');
        } catch (error) {
            toast.error('Failed to cancel mentorship request');
        }
    };

    return {
        isLoading,
        isExecutive,
        singleMentorship,
        mentor,
        formatDuration,
        searchText,
        updateLoading,
        declineLoading,
        handleUpdateMentorshipRequest,
        handleStallMentorshipRequest,
        handleDeclineMentorshipRequest,
        handleCancelMentorshipAsMentee,
        onChangeSearchText: setSearchText,
    };
}
