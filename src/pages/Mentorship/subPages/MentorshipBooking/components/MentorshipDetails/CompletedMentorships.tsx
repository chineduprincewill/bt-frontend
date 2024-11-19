import React from 'react';
import MentorshipDetailsItem from '../MentorshipDetailsItem';
import useMentorshipDetails from './useMentorshipDetails';
import { MentorshipRequest } from '../../../../../../types/mentorship';
import { useGetLoggedInUserInfoQuery } from 'api/userApi';

// interface IMentorshipDetails {
//     sessionStatus: 'pending' | 'completed' | 'active';
// }

export default function CompletedMentorships() {
    const { data: loggedinUserData } = useGetLoggedInUserInfoQuery(null);
    console.log('LOGGED IN USER', loggedinUserData?.data);
    const profileId = loggedinUserData?.data?.user.profile.id;
    const { isLoading, completedMentorshipRequests } = useMentorshipDetails(profileId!);

    if (isLoading) return <div>Loading...</div>;

    if (!completedMentorshipRequests || completedMentorshipRequests.length === 0) return <div>No completed mentorship requests</div>;

    return (
        <div className="flex flex-col gap-7">
            {completedMentorshipRequests?.map((request: MentorshipRequest) => (
                <MentorshipDetailsItem
                    key={request.id}
                    name={request.mentee.user.firstName + ' ' + request.mentee.user.lastName}
                    sessionStatus={request.status}
                    date={request.chosenDate}
                    time={request.chosenTime}
                    menteeBio={request.mentee.bio}
                    status={request.status}
                    menteeDisplayImg={request.mentee.user.displayImage}
                    id={request.id}
                    reason={request.reason}
                    mentorship={request}
                />
            ))}
        </div>
    );
}
