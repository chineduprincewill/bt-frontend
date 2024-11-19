import { Link } from 'react-router-dom';

import { GoToProfile } from '@components/GoToProfile';

import BriefcaseIcon from '../../../../../../assets/briefcase.svg';
import ClockIcon from '../../../../../../assets/clock.svg';
import DummyMentorImage from '../../../../../../assets/dummy-mentor-image.png';
import { MentorshipData } from '../../../../../../types/mentorship';
import BookMentorshipModal from '../../../../../profile/modals/BookMentorshipModal';
import { formatDate } from '@utils/date';

interface MentorshipTopicProps {
    mentorship: MentorshipData;
}

export default function MentorshipTopic({ mentorship }: MentorshipTopicProps) {
    console.log(mentorship);

    return (
        <div className="w-full h-full flex justify-between flex-col">
            <div>
                <div className="w-full aspect-square rounded-[10px]">
                    <img
                        src={mentorship.mentor.user.displayImage ?? DummyMentorImage}
                        alt="mentor image"
                        className="object-cover w-full h-full rounded-[10px]"
                    />
                </div>
                <h4 className="mt-2.5 text-[#545045] font-bold text-sm">{mentorship.title}</h4>
                <div className="flex gap-1.5 mt-2">
                    <img src={BriefcaseIcon} alt="briefcase" className="w-4 h-4" />
                    <GoToProfile userId={mentorship.mentor.id} username={mentorship.mentor.user.username}>
                        <p className="text-xs hover:underline">
                            {mentorship.mentor.user.firstName} {mentorship.mentor.user.lastName}
                        </p>
                    </GoToProfile>
                </div>
                <div className="flex gap-1.5 mt-2 w-full">
                    <img src={ClockIcon} alt="briefcase" className="w-4 h-4" />
                    <p className="text-xs text-[#8D9091]">
                        Available {formatDate(mentorship.startDate)}
                        {/* , <span className="text-black">{mentorship.}10 am to 11am</span> (GST) */}
                    </p>
                </div>
            </div>
            <div className="mt-[14px] w-full">
                <BookMentorshipModal mentorship={mentorship}>
                    <button className="btn-rounded border-solid w-full border-black border !text-black">Book Session</button>
                </BookMentorshipModal>
            </div>
        </div>
    );
}
