import CalendarIcon from '../../../../../../assets/calendar.svg';
import ClockIcon from '../../../../../../assets/clock.svg';
import { Circle } from '../../../../../../components/Circle';
import { DisplayIconForProfile } from '../../../../../profile';
import useMentorshipDetailsItem from './useMentorshipDetailsItem';
import { formatDate } from '../../../../../../utils/date';
import { MentorshipData, MentorshipRequest } from '../../../../../../types/mentorship';

interface IMentorshipDetailsItem {
    sessionStatus: string | 'upcoming' | 'completed' | 'Pending' | 'Upcoming';
    name?: string;
    date: string;
    time: string;
    menteeBio?: string | null;
    menteeDisplayImg?: string | null;
    id: string;
    status: string;
    mentorship: MentorshipRequest;
    reason: string;
}

export default function MentorshipDetailsItem({
    mentorship,
    sessionStatus,
    name,
    date,
    time,
    menteeBio,
    menteeDisplayImg,
    status,
    id,
}: IMentorshipDetailsItem) {
    const {
        toggleFullDetails,
        handleDeclineMentorshipRequest,
        handleUpdateMentorshipRequest,
        handleStallMentorshipRequest,
        isLoading,
        isExecutive,
        isFullDetailsShowing,
    } = useMentorshipDetailsItem(id!, mentorship.reason, mentorship.chosenTime, mentorship.chosenDate);

    const routeToMeetingLink = () => {
        window.open(mentorship.meetingLink, '_blank');
    };

    return (
        <div className="w-full p-[30px] bg-lightGray-7 rounded-[10px]">
            <div>
                <p>
                    A mentorship session with <span className="text-blue-500 font-medium">{name}</span>
                </p>
                <div className="flex justify-between items-center">
                    <div className="mt-6 flex gap-[18px] items-center">
                        <div className="flex gap-2 items-center">
                            <img src={CalendarIcon} alt="Date" className="w-6 h-6" />
                            <p className="text-black font-medium ">{formatDate(date)}</p>
                        </div>
                        <div className="flex gap-2 items-center">
                            <img src={ClockIcon} alt="Time" className="w-6 h-6" />
                            <p className="text-black font-medium ">{time}</p>
                        </div>
                    </div>
                    {sessionStatus === 'completed' && <button className="btn-rounded bg-primary-red">Send a message</button>}
                </div>
                <div className="mt-[60px]">
                    <div className="flex gap-3 items-center">
                        <Circle
                            bg=""
                            className="!h-8 !w-8 md:!h-[50px] md:!w-[50px] !rounded-full"
                            noMg
                            pd={0}
                            img={DisplayIconForProfile(menteeDisplayImg ? menteeDisplayImg : null)}
                        />
                        <div className="flex flex-col gap-1">
                            <h5 className="text-accent font-bold text-xl">{name}</h5>
                            <h5 className="text-black font-medium">{menteeBio}</h5>
                        </div>
                    </div>
                    {isFullDetailsShowing && (
                        <div className="mt-9 flex flex-col gap-3">
                            <div className="flex flex-col gap-1">
                                <h6 className="text-accent">Session Title</h6>
                                <p className="text-accent-2">Career Growth</p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <h6 className="text-accent">Brief Description</h6>
                                <p className="text-accent-2">Steps and processes on how to grow your career in an organization</p>
                            </div>
                            <h4 className="text-black mt-6">Created: {formatDate(date)}</h4>
                        </div>
                    )}
                    {sessionStatus === 'Pending' && isExecutive && (
                        <div className="flex gap-3 items-center mt-10">
                            <button onClick={() => handleUpdateMentorshipRequest()} className="btn-rounded bg-primary-red">
                                Accept
                            </button>
                            <button
                                onClick={handleStallMentorshipRequest}
                                className="btn-rounded !text-black border-solid border rounded-3xl px-4 py-2 border-black"
                            >
                                Stall
                            </button>
                        </div>
                    )}

                    {sessionStatus === 'Pending' && !isExecutive && (
                        <div className="flex gap-3 items-center mt-10">
                            <button onClick={handleDeclineMentorshipRequest} className="btn-rounded bg-primary-red">
                                Cancel Session Request
                            </button>
                        </div>
                    )}
                    {sessionStatus === 'Active' ||
                        (sessionStatus === 'Accepted' && (
                            <div className="flex gap-3 items-center mt-10">
                                <button onClick={routeToMeetingLink} className="btn-rounded bg-primary-red">
                                    Join Meeting
                                </button>
                                <button
                                    onClick={handleDeclineMentorshipRequest}
                                    className="btn-rounded !text-black border-solid border rounded-3xl px-4 py-2 border-black"
                                >
                                    Cancel Session
                                </button>
                            </div>
                        ))}

                    {/* {isFullDetailsShowing && (
                        <div className="mt-9 flex flex-col gap-3">
                            <div className="flex flex-col gap-1">
                                <h6 className="text-accent">Session Title</h6>
                                <p className="text-accent-2">Career Growth</p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <h6 className="text-accent">Brief Description</h6>
                                <p className="text-accent-2">Steps and processes on how to grow your career in an organization</p>
                            </div>
                            <h4 className="text-black mt-6">Created: {formatDate(date)}</h4>
                        </div>
                    )} */}

                    <button className="w-max mt-6 font-medium" onClick={toggleFullDetails}>
                        {isFullDetailsShowing ? 'View Less' : 'View More'}
                    </button>
                </div>
            </div>
        </div>
    );
}
