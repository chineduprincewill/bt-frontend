import { useGetAllJobsQuery } from 'api/jobsApi';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAppSelector } from '@state/store';

import { JobResponse } from '../../types/jobs';
import { JOB_STATUS } from './Jobs.data';
import { IJobPostingForm } from './modals/JobPostingModal/JobPostingModal.types';

export default function useJobs() {
    const [searchQuery, setSearchQuery] = useSearchParams();
    const user = useAppSelector((state) => state.createAccount.user)!;

    const status = searchQuery.get('status') || '';
    const profileId = searchQuery.get('profileId') || '';
    const q = searchQuery.get('q') || '';

    const {
        data: jobsResponse,
        isLoading,
        fulfilledTimeStamp,
        isFetching,
    } = useGetAllJobsQuery({ status, profileId, q }, { refetchOnMountOrArgChange: true });

    const [jobList, setJobList] = useState<JobResponse[]>([]);

    const [showJobPostingModal, setShowJobPostingModal] = React.useState(false);

    useEffect(() => {

        // if current filter is available, filter out the jobs not posted by me, else get all jobs response

        const isFilterByAvailableJobs = !status && !profileId
        
        setJobList((jobsResponse?.data || []).filter(isFilterByAvailableJobs ? filterAvailableJobs : Boolean));
    }, [fulfilledTimeStamp]);


    function filterAvailableJobs(job: JobResponse) {
        return job.jobProvidersProfileId !== user.profile.id;
    }

    function onShowJobPostingModal() {
        setShowJobPostingModal(true);
    }

    function onCloseJobPostingModal() {
        setShowJobPostingModal(false);
    }

    function onDeleteJob(jobId: string) {
        setJobList((prev) => prev.filter((job) => job.id !== jobId));
    }

    function onChangeSearchCategory(category: string) {
        setSearchQuery((prev) => ({ ...prev, q: category }));
    }

    function onChangeJobStatus(status: (typeof JOB_STATUS)[keyof typeof JOB_STATUS]) {
        if (status === JOB_STATUS.applied) {
            setSearchQuery({ status, profileId: '' });
        } else if (status === JOB_STATUS.available) {
            setSearchQuery({});
        } else if (status === JOB_STATUS.posted) {
            setSearchQuery({ profileId: user.profile.id, status: '' });
        }
    }

    function onRefreshFilter() {
        setSearchQuery({});
    }

    function onAddJob(job: IJobPostingForm) {
        // const newJob: Partial<JobResponse> = {
        //     ...job,
        //     payAmount: job.payAmount.toString(),
        //     companyLogo: job.companyLogo as string,
        //     jobProvider: {
        //         user: user,
        //         bio: '',
        //         id: '',
        //     },
        // };

        // setJobList((prev) => [...prev, newJob as JobResponse]);
    }

    return {
        showJobPostingModal,
        onShowJobPostingModal,
        onCloseJobPostingModal,
        jobStatus: status,
        onChangeJobStatus,
        onDeleteJob,
        isLoading: isLoading || isFetching,
        jobList,
        onAddJob,
        profileId,
        onChangeSearchCategory,
        onRefreshFilter,
    };
}
