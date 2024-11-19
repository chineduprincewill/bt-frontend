import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { useRequestMentorshipMutation } from '../../../../../../api/mentorship';
import useSingleMediaUpload from '../../../../../../hooks/useSingleMediaUpload';
import { RootState } from '../../../../../../state/store';
import { MediaSingleUploadResponse } from '../../../../../../types/common';
import { getMediaMetadata, transformSingleFileMetaToMediaContent } from '../../../../../../utils/utils';
import { IMentorshipBookingReason } from './MentorshipBookingReason';

export default function useMentorshipBookingReason({ mentorshipId, nextStep, onCloseModal }: IMentorshipBookingReason) {
    const { selectedFile, onSelectFile, progressState, uploadProgress, uploadMedia } = useSingleMediaUpload({
        infoUploadUrl: 'mentorship/request/video',
        onSuccessfulUpload: handleRequestMentorship,
    });
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const selectedDate = useSelector((state: RootState) => state.date.date);
    const selectedTime = useSelector((state: RootState) => state.time.selectedTime);
    const [requestMentorship, { isLoading, isSuccess }] = useRequestMentorshipMutation();

    const formatDate = (date: Date | null): string => {
        return date ? date.toISOString().split('T')[0] : '';
    };

    const formattedDate = formatDate(selectedDate);

    async function handleRequestMentorship(uploadStatusResponse: MediaSingleUploadResponse) {
        try {
            await requestMentorship({
                mentorshipId: mentorshipId,
                reason: '',
                chosenDate: formattedDate,
                chosenTime: selectedTime!,
                uploadKey: uploadStatusResponse.uploadKey,
            }).unwrap();
            toast.success('Mentorship booked successfully');
            onCloseModal();
        } catch (error) {
            console.log(error);
            toast.error('Unable to book mentorship');
        }
    }

    async function onDropFile(e: File[]) {
        const filesMetadata = await getMediaMetadata(e);

        onSelectFile(filesMetadata[0]);
    }

    function onBookSession() {
        uploadMedia(
            transformSingleFileMetaToMediaContent(selectedFile!, {
                mentorshipId: mentorshipId,
                chosenDate: formattedDate,
                chosenTime: selectedTime!,
            }),
        );
    }

    return {
        handleRequestMentorship,
        isLoading,
        isSuccess,
        onSelectFile,
        selectedFile,
        progressState,
        uploadProgress,
        onDropFile,
        showSuccessMessage,
        onBookSession,
    };
}
