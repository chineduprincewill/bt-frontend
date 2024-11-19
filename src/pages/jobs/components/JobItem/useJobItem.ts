import { formatDistance } from 'date-fns';
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { JOB_STATUS } from '@pages/jobs/Jobs.data';
import { useAppSelector } from '@state/store';

import { IJobItem } from './JobItem';

export default function useJobItem({ job }: IJobItem) {
    const [showManageModal, setShowManageModal] = useState(false);
    const [showJobApplyModal, setShowJobApplyModal] = useState(false);

    const [searchQuery] = useSearchParams();

    const isApplied = searchQuery.get('status') === JOB_STATUS.applied;

    const { id } = useAppSelector((state) => state.createAccount.user.profile)!;

    function onCloseJobApplyModal() {
        setShowJobApplyModal(false);
    }

    function onCloseManageJobModal() {
        setShowManageModal(false);
    }

    function onShowModal() {
        // Is my job posting
        if (wasJobPostedByMe) setShowManageModal(true);
        else setShowJobApplyModal(true);
    }

    const wasJobPostedByMe = job.jobProvidersProfileId === id;

    const createdFromDistance = formatDistance(new Date(job.createdAt), new Date(), { addSuffix: true });

    return {
        showManageModal,
        showJobApplyModal,
        wasJobPostedByMe,
        onCloseJobApplyModal,
        onCloseManageJobModal,
        onShowModal,
        createdFromDistance,
        isApplied,
    };
}
