import React from 'react';
import MentorshipDetailsItem from '../MentorshipDetailsItem';
import useMentorshipDetails from './useMentorshipDetails';
import { MentorshipRequest, MentorshipData } from '../../../../../../types/mentorship';
import { useViewUpcomingMentorshipRequeestsQuery } from '../../../../../../api/mentorship';
import { useGetLoggedInUserInfoQuery } from 'api/userApi';

// interface IMentorshipDetails {
//     sessionStatus: 'pending' | 'completed' | 'active';
// }

export default function MentorshipDetailsAccepted() {
    const { data: loggedinUserData } = useGetLoggedInUserInfoQuery(null);
    console.log('LOGGED IN USER', loggedinUserData?.data);
    const profileId = loggedinUserData?.data?.user.profile.id;
    const { mentorshipRequests, activeMentorshipRequests, isLoading } = useMentorshipDetails(profileId!);

    if (isLoading) return <div>Loading...</div>;

    console.log('TESTING MENTORSHIP REQUESTS', mentorshipRequests);

    if (!mentorshipRequests || mentorshipRequests.length === 0) return <div>No upcoming mentorship requests</div>;

    return (
        <div className="flex flex-col gap-7">
            {activeMentorshipRequests?.map((request: MentorshipRequest) => (
                <MentorshipDetailsItem
                    mentorship={request}
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
                />
            ))}
        </div>
    );
}
