import React, { useState, useEffect } from 'react';
import { IMentorshipBookingStep } from '../../BookMentorshipModal.types';
import CloseIcon from '../../../../../../assets/close-icon.svg';
import useMentorshipBookingReason from './useMentorshipBookingReason';
import { MentorshipData } from '../../../../../../types/mentorship';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../state/store';
import MentorshipBookingVideoUpload from './components/MentorshipBookingVideoUpload';
import { transformFileMetaToMediaContent } from '../../../../../../utils/utils';

export interface IMentorshipBookingReason extends IMentorshipBookingStep {
    reason: string;
    mentorshipId: string;
    mentorship: MentorshipData;
}

export default function MentorshipBookingReason(props: IMentorshipBookingReason) {
    const {
        handleRequestMentorship,
        isLoading,
        isSuccess,
        onSelectFile,
        showSuccessMessage,
        selectedFile,
        progressState,
        uploadProgress,
        onBookSession,
        onDropFile,
    } = useMentorshipBookingReason(props);
    const selectedDate = useSelector((state: RootState) => state.date.date);

    const formatDate = (date: Date | null): string => {
        const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', day: '2-digit' };
        return date ? date.toLocaleDateString('en-US', options).replace(',', '') : 'Thursdays, 08, 2020';
    };

    return (
        <div className="flex flex-col justify-between w-full">
            <div className="flex justify-between items-center w-full">
                <h4 className="text-[#8E8E8E]">STEP 3 OF 3</h4>
                <img onClick={props.onCloseModal} src={CloseIcon} className="w-6 h-6" role="button" />
            </div>
            {showSuccessMessage && <div className="text-green-500 text-center my-4">Mentorship request sent successfully!</div>}

            <div className="flex gap-1 flex-col mt-4 pb-8 border-b border-solid border-lightGray-7">
                <h3 className="text-2xl font-medium text-black">Why should you be mentored</h3>
                <p className="text-[#4C4C4C] font-medium text-sm">
                    Your mentor would like to know why you would like to be mentored. This would determine your credibility of being mentored. Please
                    be brief and detailed.
                </p>
            </div>
            <div className="mt-8">
                <p className="text-[#B3B3B3] font-medium">
                    Date: <span className="text-[#4C4C4C]">{formatDate(selectedDate)}</span>
                </p>
                <section className="flex flex-col gap-4 mt-8">
                    <label htmlFor="description" className="text-base font-medium text-black">
                        Please upload a video stating why you should be mentored
                    </label>
                    <MentorshipBookingVideoUpload
                        file={selectedFile}
                        onDropFiles={onDropFile}
                        progressState={progressState}
                        uploadProgress={uploadProgress}
                        onRemoveFile={() => onSelectFile(null)}
                    />
                </section>
            </div>
            <div className="w-full flex gap-3 items-center mt-8">
                <button className="btn-rounded !text-accent" onClick={props.prevStep}>
                    Go back
                </button>
                <button onClick={onBookSession} className="btn-rounded bg-primary-red">
                    {isLoading ? 'Loading...' : 'Submit'}
                </button>
            </div>
        </div>
    );
}
