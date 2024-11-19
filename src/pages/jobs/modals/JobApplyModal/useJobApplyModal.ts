import { useApplyToJobMutation } from 'api/jobsApi';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import useMediaUpload from '@hooks/useMediaUpload';
import { MediaContentMetadata } from '@type/common';
import { JobApplicationRequest } from '@type/jobs';
import { getMediaMetadata, transformFileMetaToMediaContent } from '@utils/utils';

import { IJobApplyModal } from './JobApplyModal';
import { JOB_APPLICATION_SCHEMA } from './JobsApplyModal.utils';

export default function useJobApplyModal({ job, onClose }: IJobApplyModal) {
    const [resumeFile, setResumeFile] = React.useState<MediaContentMetadata | null>(null);
    const [coverFile, setCoverFile] = React.useState<MediaContentMetadata | null>(null);

    const [jobApplicationForm, setJobApplicationForm] = useState<JobApplicationRequest>({} as JobApplicationRequest);

    const [applyToJob, { isLoading }] = useApplyToJobMutation();

    const { uploadMedia, loading } = useMediaUpload({
        infoUploadUrl: 'jobs/upload/content',
        onSuccessfulUpload: onApplicationSuccessful,
    });

    function onChangeForm(name: string, value: string) {
        setJobApplicationForm((prev) => ({ ...prev, [name]: value }));
    }

    async function onDropFile(e: 'resume' | 'cover', files: File[]) {
        try {
            const fileMetaData = await getMediaMetadata(files);

            if (e === 'resume') {
                setResumeFile({ ...fileMetaData[0], extra: { isResume: true } });
            } else {
                setCoverFile({ ...fileMetaData[0], extra: { isCoverLetter: true } });
            }
        } catch (error: any) {
            toast.error(error?.message ? error.message : 'Unable to upload file');
        }
    }

    function onRemoveFile(e: 'resume' | 'cover') {
        if (e === 'resume') {
            setResumeFile(null);
        } else {
            setCoverFile(null);
        }
    }

    async function onApplicationSuccessful() {
        try {
            await applyToJob({ ...jobApplicationForm, jobId: job.id! }).unwrap();
            toast.success('Application submitted successfully');
            onClose();
        } catch (error: any) {
            toast.error(error?.message ? error.message : 'Unable to upload file');
        }
    }

    function onSubmit() {
        const requestPayload = { ...jobApplicationForm, jobId: job.id! };

        const invalidFormMessage = JOB_APPLICATION_SCHEMA.safeParse(requestPayload).error?.issues[0]?.message || '';
        if (invalidFormMessage) {
            toast.error(invalidFormMessage);
            return;
        }

        // Ensure no null values
        const filesToBeUploaded = [resumeFile, coverFile].filter(Boolean) as MediaContentMetadata[];

        uploadMedia(transformFileMetaToMediaContent(filesToBeUploaded, { jobId: job.id! }), filesToBeUploaded);
    }

    return { onDropFile, onRemoveFile, resumeFile, coverFile, onChangeForm, jobApplicationForm, onSubmit, isLoading: isLoading || loading };
}
