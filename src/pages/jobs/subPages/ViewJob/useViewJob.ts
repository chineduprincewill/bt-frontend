import { useDeleteJobMutation, useGetJobQuery } from 'api/jobsApi';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAppSelector } from '@state/store';
import { JobResponse } from '@type/jobs';

export default function useViewJob() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [showApplyModal, setShowApplyModal] = useState(false);
    const [showManageModal, setShowManageModal] = useState(false);

    const { data: viewJobResponse, isLoading } = useGetJobQuery(id!);

    const { id: profileId } = useAppSelector((state) => state.createAccount.user.profile)!;

    const wasJobPostedByMe = viewJobResponse?.data.jobProvidersProfileId === profileId;

    function onCloseModal() {
        setShowApplyModal(false);
        setShowManageModal(false);
    }

    function onShowModal() {
        // Is my job posting
        if (wasJobPostedByMe) setShowManageModal(true);
        else setShowApplyModal(true);
    }

    function onDeleteJob() {
        navigate('/jobs');
    }

    return {
        job: viewJobResponse?.data || ({} as JobResponse),
        isLoading,
        onCloseModal,
        showApplyModal,
        showManageModal,
        onShowModal,
        wasJobPostedByMe,
        onDeleteJob,
    };
}
