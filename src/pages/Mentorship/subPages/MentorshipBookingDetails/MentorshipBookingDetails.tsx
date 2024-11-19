import React from 'react';
import PageContainer from '../../../../components/PageContainer';
import UserDetail from '../../../../components/UserDetail';
import IconButton from '../../../../components/IconButton';
import TickCircle from '../../../../assets/tick-circle.svg';
import TimerIcon from '../../../../assets/timer.svg';
import MasterClassReviews from '../../../masterClass/components/MasterClassReviews';
import { formatDate } from '@utils/date';
import useMentorshipBooking from './useMentorshipBookingDetails';

const MENTORSHIP_BOOKING_DETAILS_TABS = [
    {
        title: 'Reviews',
        content: <MasterClassReviews />,
    },
    {
        title: 'Similar Sessions',
        content: <p>Similar Sessions</p>,
    },
];

export default function MentorshipBookingDetails() {
    const {
        isLoading,
        isExecutive,
        singleMentorship,
        formatDuration,
        handleCancelMentorshipAsMentee,
        handleUpdateMentorshipRequest,
        handleDeclineMentorshipRequest,
        mentor,
    } = useMentorshipBooking();

    console.log('SINGLE MENTORSHIP REQUEST', singleMentorship);
    console.log('ARE YOU AN EXECUTIVE', isExecutive);

    if (isLoading) return <div className="pulse">Loading details...</div>;

    if (!singleMentorship) return <div>No mentorship request found.</div>;

    const renderButton = () => {
        if (singleMentorship.status === 'Pending' && isExecutive) {
            return (
                <button
                    onClick={handleUpdateMentorshipRequest}
                    className="border h-full flex-shrink-0 border-accent-5 !text-white px-7 rounded-3xl bg-[#FF0000]"
                >
                    Accept
                </button>
            );
        } else if (singleMentorship.status === 'Accepted' && isExecutive) {
            return (
                <a
                    href={singleMentorship.meetingLink}
                    className="border h-full flex items-center flex-shrink-0  !text-white px-7 rounded-3xl bg-[#FF0000]"
                >
                    Join meeting
                </a>
            );
        } else if (!isExecutive) {
            return (
                <button
                    onClick={handleCancelMentorshipAsMentee}
                    className="border h-full flex items-center flex-shrink-0 border-accent-5 !text-white px-7 rounded-3xl bg-[#FF0000]"
                >
                    Cancel Session
                </button>
            );
        } else {
            return (
                <button className="border h-full flex items-center flex-shrink-0 border-accent-5 !text-white px-7 rounded-3xl bg-[#FF0000]">
                    Attended
                </button>
            );
        }
    };

    return (
        <PageContainer>
            <div className="flex flex-col gap-9 bg-lightGray-7 rounded-[10px]">
                <div className="p-4">
                    <h3 className="font-bold text-xs">MENTOR DETAILS</h3>
                    <UserDetail name={mentor} className="mt-6" />
                </div>
                <div className="p-4">
                    <h3 className="font-bold text-xs">SESSION DETAILS</h3>
                    <div className="mt-7">
                        <div className="flex w-full items-center justify-between gap-4">
                            <h3 className="text-2xl text-black font-semibold">{singleMentorship.mentorship.title}</h3>
                            {singleMentorship.status === 'Completed' && (
                                <IconButton
                                    className="border border-accent-5 !text-black btn-rounded"
                                    icon={<img src={TickCircle} alt="status" className="w-[18px] h-[18px]" />}
                                >
                                    {singleMentorship.status}
                                </IconButton>
                            )}

                            {singleMentorship?.status !== 'completed' && (
                                <div className="flex-shrink-0 flex items-center space-x-7 h-12 ">
                                    {renderButton()}

                                    {isExecutive && (
                                        <button
                                            onClick={handleDeclineMentorshipRequest}
                                            className="border h-full border-solid text-black px-7 rounded-3xl "
                                        >
                                            Decline
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="mt-2 flex justify-between gap-4 items-center font-medium">
                            <p className="text-accent-5 max-w-sm">You have no upcoming bookings - start sharing a conversation with a mentor.</p>
                            <p className="text-black">{singleMentorship.mentorship.startDate}</p>
                        </div>
                        <div className="mt-5 flex gap-2">
                            <img className="w-4 h-4" alt="timer" src={TimerIcon} />
                            <span className="text-accent-6 font-medium text-sm">
                                {singleMentorship && formatDuration(singleMentorship.mentorship.duration)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            {/* NOT NEEDED FOR NOW */}
            {/* <div className="mt-10">
                <Tabs options={MENTORSHIP_BOOKING_DETAILS_TABS} />
            </div> */}
        </PageContainer>
    );
}
