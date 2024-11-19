import React from 'react';
import CloseIcon from '../../../../../../assets/close-icon.svg';
import { IMentorshipBookingStep } from '../../BookMentorshipModal.types';
import { DUMMMY_AVAILABILITY } from '../MentorshipDateSelect/MentorshipDateSelect.dummy';
import useMentorshipTimeSelect from './useMentorshipTimeSelect';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../../../state/store';
import { setSelectedTime } from '../../../../../../state/slices/timeSlice';

interface IMentorshipTimeSelect extends IMentorshipBookingStep {
    dayIndex: number;
    mentorId: string;
}

export default function MentorshipTimeSelect({ onCloseModal, mentorId, dayIndex, prevStep, nextStep }: IMentorshipTimeSelect) {
    const { onSelectTimeSlot, selectedTimeSlotIndex, weeklyAvailability } = useMentorshipTimeSelect(mentorId);
    const dispatch = useDispatch();
    const selectedDate = useSelector((state: RootState) => state.date.date);
    console.log(selectedDate);
    const selectedTime = useSelector((state: RootState) => state.time.selectedTime);

    const formatDate = (date: Date | null): string => {
        const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', day: '2-digit' };
        return date ? date.toLocaleDateString('en-US', options).replace(',', '') : 'Thursdays, 08, 2020';
    };

    const getDayOfWeek = (date: Date | null): string => {
        return date ? date.toLocaleDateString('en-US', { weekday: 'long' }) : '';
    };

    const dayOfWeek = getDayOfWeek(selectedDate);
    const dayAvailability = weeklyAvailability?.find((day) => day.dayOfWeek === dayOfWeek);

    const handleSelectTime = (index: number, time: string) => {
        onSelectTimeSlot(index);
        dispatch(setSelectedTime(time));
    };

    console.log('SELECTED TIME:', selectedTime);

    return (
        <div className="flex flex-col justify-between w-full">
            <div className="flex justify-between items-center w-full">
                <h4 className="text-[#8E8E8E]">STEP 2 OF 3</h4>
                <img onClick={onCloseModal} src={CloseIcon} className="w-6 h-6 absolute right-0 md:relative " role="button" />
            </div>
            <div className="flex gap-1 flex-col mt-4 pb-8 border-b border-solid border-lightGray-7">
                <h3 className="text-2xl font-medium text-black">Set date and time</h3>
                <p className="text-[#4C4C4C] font-medium text-sm">
                    Set your date and time to match your local timezone (Africa/Lagos). Ensure you set a date and time that is convenient for you .
                </p>
            </div>
            <div className="mt-8">
                <p className="text-[#B3B3B3] font-medium">
                    Date: <span className="text-[#4C4C4C]">{formatDate(selectedDate)}</span>
                </p>
                <p className="mt-8">Available Time slots</p>
                <div className="flex flex-wrap gap-3 mt-4">
                    {dayAvailability?.timeSlots.map((slot, index: number) => (
                        <button
                            onClick={() => handleSelectTime(index, slot.start)}
                            // onClick={() => onSelectTimeSlot(index)}
                            className="rounded-[10px] border border-solid border-[#B3B3B3] px-4 py-3"
                            style={{
                                backgroundColor: selectedTimeSlotIndex === index ? 'black' : 'transparent',
                                color: selectedTimeSlotIndex === index ? 'white' : 'black',
                            }}
                        >
                            {slot.start}
                        </button>
                    ))}
                </div>
                <div className="w-full flex gap-3 items-center mt-8">
                    <button className="btn-rounded !text-accent" onClick={prevStep}>
                        Go back
                    </button>
                    <button
                        disabled={selectedTime === null}
                        onClick={nextStep}
                        className={`btn-rounded bg-primary-red ${selectedTime !== null ? '' : 'opacity-50 cursor-not-allowed'}`}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}
