import PageContainer from '../../../../components/PageContainer';
import Tabs from '../../../../components/Tabs';
import MentorshipDetails from './components/MentorshipDetails';
import useMentorshipBooking from './useMentorshipBooking';
import MentorshipDetailsAccepted from './components/MentorshipDetails/MentorshipDetailsAccepted';
import CompletedMentorships from './components/MentorshipDetails/CompletedMentorships';

export default function MentorshipBooking() {
    const { initialTab, setTabQuery } = useMentorshipBooking();

    const handleTabChange = (tabIndex: number) => {
        setTabQuery(tabIndex);
    };

    return (
        <PageContainer back title="Mentorship Booking" subTitle="This section manages upcoming and completed mentorship sessions">
            <Tabs
                initialTab={initialTab}
                options={MENTORSHIP_TABS}
                buttonContainerClassName="!pb-7 border-b border-lightGray-8 border-solid mb-8"
                onTabChange={handleTabChange}
            />
        </PageContainer>
    );
}

export const MENTORSHIP_TABS = [
    {
        title: 'Pending Requests',
        content: <MentorshipDetails />,
    },
    {
        title: 'Upcoming Sessions',
        content: <MentorshipDetailsAccepted />,
    },
    {
        title: 'Completed Sessions',
        content: <CompletedMentorships />,
    },
];
