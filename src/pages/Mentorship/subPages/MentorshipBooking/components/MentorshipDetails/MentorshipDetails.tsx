import React from 'react';
import MentorshipDetailsItem from '../MentorshipDetailsItem';
import useMentorshipDetails from './useMentorshipDetails';
import { MentorshipRequest, MentorshipData } from '../../../../../../types/mentorship';
import { useGetLoggedInUserInfoQuery } from '../../../../../../api/userApi';

interface IMentorshipDetails {
    sessionStatus: 'upcoming' | 'completed' | 'pending';
}

export default function MentorshipDetails() {
    const { data: loggedinUserData } = useGetLoggedInUserInfoQuery(null);
    console.log('LOGGED IN USER', loggedinUserData?.data);
    const profileId = loggedinUserData?.data?.user.profile.id;
    const { pendingMentorshipRequests, mentorshipRequests, isLoading } = useMentorshipDetails(profileId!);

    console.log('ALL MENTORSHIPS', mentorshipRequests);
    console.log('PENDING MENTORSHIP REQUESTS', pendingMentorshipRequests);

    if (isLoading) return <div>Loading...</div>;

    if (!pendingMentorshipRequests || pendingMentorshipRequests.length === 0) return <div>No pending mentorship requests</div>;

    return (
        <div className="flex flex-col gap-7">
            {pendingMentorshipRequests?.map((request: MentorshipRequest) => (
                <MentorshipDetailsItem
                    mentorship={request}
                    status={request.status}
                    key={request.id}
                    name={request.mentee.user.firstName + ' ' + request.mentee.user.lastName}
                    sessionStatus={request.status}
                    date={request.chosenDate}
                    time={request.chosenTime}
                    menteeBio={request.mentee.bio}
                    menteeDisplayImg={request.mentee.user.displayImage}
                    id={request.id}
                    reason={request.reason}
                />
            ))}
        </div>
    );
}
