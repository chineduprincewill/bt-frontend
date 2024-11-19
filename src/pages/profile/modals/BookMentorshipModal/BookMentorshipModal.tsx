import ModalContainer from '../../../../components/ModalContainer';
import useBookMentorshipModal from './useBookMentorshipModal';
import Teacher from '../../../../assets/Teacher.svg';

import MentorshipDateSelect from './components/MentorshipDateSelect';
import { ProfileBox } from '../../../../components/ProfileBox';
import UserDetail from '../../../../components/UserDetail';
import MentorshipTimeSelect from './components/MentorshipTimeSelect';
import MentorshipBookingReason from './components/MentorshipBookingReason';
import { MentorshipData } from '../../../../types/mentorship';
import { useDispatch } from 'react-redux';

interface IBookMentorshipModal {
    children: React.ReactNode;
    // mentorshipId?: string;
    // mentorName: string;
    mentorship: MentorshipData;
}

export default function BookMentorshipModal({ children, mentorship }: IBookMentorshipModal) {
    const { setShowModal, showModal, currentStep, nextStep, prevStep } = useBookMentorshipModal();
    const dispatch = useDispatch();

    const durationInMinutes = mentorship.duration;
    const durationInHours = durationInMinutes / 60;

    console.log('MENTORSHIP', mentorship);
    // const handleDateSelect = (date: string) => {
    //     console.log(date); // Logging the selected date
    //     dispatch(setDate(date)); // Dispatching the date to the Redux store
    // };

    let CurrentStep = (
        <MentorshipDateSelect
            mentorship={mentorship}
            mentorId={mentorship.mentor.id}
            onCloseModal={() => setShowModal(false)}
            nextStep={nextStep}
            prevStep={prevStep}
            currentStep={currentStep}
        />
    );

    if (currentStep === 1)
        CurrentStep = (
            <MentorshipTimeSelect
                mentorId={mentorship.mentor.id}
                dayIndex={0}
                onCloseModal={() => setShowModal(false)}
                nextStep={nextStep}
                prevStep={prevStep}
                currentStep={currentStep}
            />
        );
    else if (currentStep === 2)
        CurrentStep = (
            <MentorshipBookingReason
                mentorship={mentorship}
                mentorshipId={mentorship.id}
                reason="testing"
                currentStep={currentStep}
                nextStep={nextStep}
                prevStep={prevStep}
                onCloseModal={() => setShowModal(false)}
            />
        );

    return (
        <>
            <div role="button" onClick={() => setShowModal(true)}>
                {children}
            </div>

            {showModal && (
                <ModalContainer>
                    <div className="bg-white rounded-[10px] px-4 md:px-8 py-[54px] max-w-[960px] min-w-72 w-full h-max m-auto overflow-y-scroll">
                        <div className="md:grid grid-cols-5">
                            <div className="col-span-2 px-4 md:border-r border-solid border-[#CACACA]">
                                <UserDetail
                                    img={mentorship.mentor.user.displayImage}
                                    name={`${mentorship.mentor.user.firstName} ${mentorship.mentor.user.lastName}`}
                                />
                                <h4 className="text-xl md:text-2xl mt-10 md:mt-16 font-bold">{mentorship.title}</h4>
                                <div className="flex flex-col gap-1">
                                    <h6 className="text-accent text-xl md:text-2xl mt-5">Session duration</h6>
                                    <p className="text-accent-2">{durationInHours} hour(s)</p>
                                </div>
                                <div className="flex flex-col gap-1 mt-3 md:mt-5">
                                    <h6 className="text-accent text-xl md:text-2xl">About</h6>
                                    <p className="text-accent-2">Steps and processes on how to grow your career in an organization</p>
                                </div>
                            </div>
                            <div className="col-span-3 px-4 py-5">{CurrentStep}</div>
                        </div>
                    </div>
                </ModalContainer>
            )}
        </>
    );
}
