import React from 'react';
import CloseIcon from '../../../../../../assets/close-icon.svg';
import CalendarPicker from '../../../../../../components/CalenderPicker';
import { validateDateSelect } from './MentorshipDateSelect.utils';
import { DUMMMY_AVAILABILITY } from './MentorshipDateSelect.dummy';
import { IMentorshipBookingStep } from '../../BookMentorshipModal.types';
import { useGetAvailabilityQuery } from '../../../../../../api/mentorship';
import { useDispatch } from 'react-redux';
import { setDate } from '../../../../../../state/slices/dateSelector';
import { MentorshipData } from '../../../../../../types/mentorship';

interface IMentorshipDateSelect extends IMentorshipBookingStep {
    mentorId: string;
    mentorship: MentorshipData;
}

export default function MentorshipDateSelect({ mentorship, mentorId, onCloseModal, nextStep }: IMentorshipDateSelect) {
    const { data: availabilityData, isLoading } = useGetAvailabilityQuery(mentorId);
    console.log('AVAILABILITY', availabilityData);
    const dispatch = useDispatch();

    const handleDateSelect = (date: Date) => {
        console.log(date);
        dispatch(setDate(date));
    };

    const startDate = new Date(mentorship.startDate);
    const endDate = new Date(mentorship.endDate);

    return (
        <div className="flex flex-col items-center justify-between w-full">
            <div className="flex justify-between items-center w-full">
                <h4 className="text-[#8E8E8E]">STEP 1 OF 3</h4>
                <img onClick={onCloseModal} src={CloseIcon} className="w-6 h-6" role="button" />
            </div>
            <div className="flex gap-1 flex-col mt-4">
                <h3 className="text-xl md:text-2xl font-medium text-black">Set date and time</h3>
                <p className="text-[#4C4C4C] font-normal md:font-medium text-xs md:text-sm">
                    Set your date and time to match your local timezone (Africa/Lagos). Ensure you set a date and time that is convenient for you and
                    your memtor.
                </p>
            </div>
            <div className="mt-4 w-full">
                {/* {availabilityData?.data && (
                    <CalendarPicker
                        selectedDate={startDate}
                        onDateSelect={handleDateSelect}
                        // availability={availabilityData?.data}
                        // onDateSelect={(e) => console.log(e)}
                        // validateFn={(date) => validateDateSelect(date, availabilityData?.data)}
                        validateFn={(date) => validateDateSelect(date, startDate, endDate, availabilityData?.data)}
                    />
                )} */}
                {isLoading ? (
                    // Show loading state while data is loading
                    <div className="h-14 w-14 justify-center items-center animate-pulse ">Loading calander...</div>
                ) : (
                    availabilityData && (
                        <CalendarPicker
                            selectedDate={startDate}
                            onDateSelect={handleDateSelect}
                            validateFn={(date) => validateDateSelect(date, startDate, endDate, availabilityData?.data.availability)}
                        />
                    )
                )}
            </div>
            <div className="w-full flex gap-3 items-center mt-8">
                <button className="btn-rounded !text-accent" onClick={onCloseModal}>
                    Cancel
                </button>
                <button className="btn-rounded bg-primary-red" onClick={nextStep}>
                    Submit
                </button>
            </div>
        </div>
    );
}
