import { validate } from 'uuid';
import { useCreateJobMutation } from 'api/jobsApi';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import useSingleMediaUpload from '@hooks/useSingleMediaUpload';
import { getMediaMetadata, transformSingleFileMetaToMediaContent } from '@utils/utils';

import { IJobPostingForm } from './JobPostingModal.types';
import { jobPostingFormSchema } from './JobPostingModal.utils';

interface IUseJobPostingModal {
    onCloseModal: () => void;
    onSuccess: (e: IJobPostingForm) => void;
}

export default function useJobPostingModal({ onCloseModal, onSuccess }: IUseJobPostingModal) {
    const [jobForm, setJobForm] = useState<IJobPostingForm>({} as IJobPostingForm);

    const [currentStep, setCurrentStep] = useState(0);

    const [createJob, { isLoading }] = useCreateJobMutation();

    const { onSelectFile, uploadMedia, selectedFile, loading } = useSingleMediaUpload({
        infoUploadUrl: 'jobs/upload/company-logo',
        onSuccessfulUpload: ({ uploadKey }) => onUploadSuccessful(uploadKey),
    });

    async function onChange(name: string, value: string | File[] | MediaMetadata | null) {
        if (name === 'companyLogo') {

            if(value === null) {
                onSelectFile(null)
                setJobForm((prev) => ({ ...prev, companyLogo: null }));
                return
            } 

            const fileMetadata = await getMediaMetadata(value as File[]);

            setJobForm((prev) => ({ ...prev, companyLogo: fileMetadata[0] }));
            onSelectFile(fileMetadata[0]);
            return;
        }

        setJobForm((prev) => ({ ...prev, [name]: value }));
    }

    function onNextStep() {
        setCurrentStep((prev) => prev + 1);
    }

    function onPreviousStep() {
        setCurrentStep((prev) => prev - 1);
    }

    function onSubmit() {

        console.log(jobPostingFormSchema.safeParse(jobForm));
        const invalidFormMessage = jobPostingFormSchema.safeParse(jobForm).error?.issues[0]?.message || '';

        if (invalidFormMessage) {
            toast.error(invalidFormMessage);
            return;
        }

        uploadMedia(transformSingleFileMetaToMediaContent(selectedFile!));
    }

    async function onUploadSuccessful(uploadKey: string) {
        try {
            const { companyLogo, ...requestPayload } = jobForm;

            if (jobForm.companyLogo) {
                // @ts-ignore
                requestPayload['uploadKey'] = uploadKey;
            }

            // @ts-ignore
            const createdJobResponse = await createJob(requestPayload).unwrap();
            toast.success('Job created successfully');
            onSuccess(createdJobResponse.data);
            onCloseModal();
        } catch (error: any) {
            toast.error(error?.message ? error.message : 'Unable to create job');
        }
    }

    return { onChange, jobForm, onPreviousStep, onNextStep, currentStep, onSubmit, isLoading: isLoading || loading };
}
