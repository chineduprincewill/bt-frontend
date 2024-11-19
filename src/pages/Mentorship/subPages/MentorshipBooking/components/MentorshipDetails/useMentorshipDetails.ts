import { useSearchParams } from 'react-router-dom';
import { useViewMentorshipAsMentorQuery } from '../../../../../../api/mentorship';
import { useGetLoggedInUserInfoQuery } from 'api/userApi';

export default function useMentorshipDetails(mentorId: string) {
    const [searchParams] = useSearchParams();

    const { data: loggedInUserData } = useGetLoggedInUserInfoQuery(null);

    const userType = loggedInUserData?.data.user.role.name === 'executive' ? 'mentorId' : 'menteeId';

    const { data: mentorshipRequestsData, isLoading } = useViewMentorshipAsMentorQuery({ userType, mentorId });
    const mentorshipRequests = mentorshipRequestsData?.data;

    const pendingMentorshipRequests = mentorshipRequestsData?.data?.filter((request) => request.status === 'Pending');
    console.log('PENDING REQUESTS', pendingMentorshipRequests);

    const activeMentorshipRequests = mentorshipRequestsData?.data?.filter((request) => request.status === 'Active' || request.status === 'Accepted');
    console.log('ACTIVE REQUESTS', activeMentorshipRequests);

    const completedMentorshipRequests = mentorshipRequestsData?.data?.filter((request) => request.status === 'Completed');
    console.log('COMPLETED REQUESTS', completedMentorshipRequests);

    const initialTabQuery = searchParams.get('q');

    // const initialTab = initialTabQuery === 'completed' ? 1 : 0;

    const initialTab = initialTabQuery === 'completed' ? 2 : initialTabQuery === 'upcoming' ? 1 : 0;

    return { initialTab, mentorshipRequests, pendingMentorshipRequests, activeMentorshipRequests, completedMentorshipRequests, isLoading };
}
