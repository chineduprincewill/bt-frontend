import React, { useEffect } from 'react';
import { useUpdateMentorshipRequestMutation, useDeclineMentorshipRequestMutation } from '../../../../../../api/mentorship';
import { toast } from 'react-toastify';
import { useGetLoggedInUserInfoQuery } from 'api/userApi';

export default function useMentorshipDetailsItem(mentorshipRequestId: string, reason: string, chosenTime: string, chosenDate: string) {
    const [isFullDetailsShowing, setIsFullDetailsShowing] = React.useState(false);
    const [updateMentorshipRequest, { isLoading: updateLoading, isSuccess: updateSuccess, isError: updateError }] =
        useUpdateMentorshipRequestMutation();
    const [declineMentorshipRequest, { isLoading: declineLoading, isSuccess: declineSuccess, isError: declineError }] =
        useDeclineMentorshipRequestMutation();

    const { data: loggedInUserData } = useGetLoggedInUserInfoQuery(null);

    const isExecutive = loggedInUserData?.data.user.role.name === 'executive';

    function formatDate(ISOString: string) {
        const date = new Date(ISOString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const formattedDate = formatDate(chosenDate);

    console.log('FORMATTED DATE FOR MENTORSHIP', formattedDate);

    useEffect(() => {
        if (updateSuccess) {
            handleSuccess('Mentorship Request Accepted');
        } else if (updateError) {
            handleError('An error occurred while accepting the mentorship request');
        }
    }, [updateSuccess, updateError]);

    useEffect(() => {
        if (declineSuccess) {
            handleSuccess('Mentorship Request Declined');
        } else if (declineError) {
            handleError('An error occurred while declining the mentorship request');
        }
    }, [declineSuccess, declineError]);

    const handleUpdateMentorshipRequest = async () => {
        await updateMentorshipRequest({ mentorshipRequestId, chosenTime, chosenDate: formattedDate, reason, status: 'Accepted' }).unwrap();
    };

    const handleStallMentorshipRequest = async () => {
        await updateMentorshipRequest({ mentorshipRequestId, status: 'Stalled' }).unwrap();
    };

    const handleDeclineMentorshipRequest = async () => {
        await declineMentorshipRequest({ mentorshipRequestId, chosenTime, chosenDate: formattedDate, reason, status: 'Declined' }).unwrap();
    };

    function handleSuccess(message: string) {
        toast.success(message);
    }

    function handleError(errorMessage: string) {
        toast.error(errorMessage);
    }

    function toggleFullDetails() {
        setIsFullDetailsShowing(!isFullDetailsShowing);
    }

    return {
        toggleFullDetails,
        handleUpdateMentorshipRequest,
        handleDeclineMentorshipRequest,
        handleStallMentorshipRequest,
        isLoading: updateLoading || declineLoading,
        isExecutive,
        isFullDetailsShowing,
    };
}
