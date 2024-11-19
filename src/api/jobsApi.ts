import { IJobPostingForm } from '@pages/jobs/modals/JobPostingModal/JobPostingModal.types';
import { JobApplicationRequest, JobResponse } from '@type/jobs';

import { SERVER_URL } from '../constants';
import { ApiResponse } from '../types/common';
import { apiSlice } from './api';

export const jobsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllJobs: builder.query<ApiResponse<JobResponse[]>, { status?: string; profileId?: string; q?: string }>({
            query: (params) => ({
                url: `${SERVER_URL}/jobs`,
                method: 'GET',
                params,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
        getJob: builder.query<ApiResponse<JobResponse>, string>({
            query: (id: string) => ({
                url: `${SERVER_URL}/jobs/single`,
                method: 'GET',
                params: { jobId: id },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
        deleteJob: builder.mutation<boolean, string>({
            query: (id: string) => ({
                url: `${SERVER_URL}/jobs/delete`,
                method: 'DELETE',
                params: { jobId: id },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
        createJob: builder.mutation<ApiResponse<IJobPostingForm>, IJobPostingForm & { uploadKey: string }>({
            query: (body) => ({
                url: `${SERVER_URL}/jobs/create-job`,
                method: 'POST',
                body,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
        applyToJob: builder.mutation<ApiResponse<JobApplicationRequest>, JobApplicationRequest>({
            query: (body) => ({
                url: `${SERVER_URL}/jobs/job-application`,
                method: 'POST',
                body,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
    }),
});

export const { useGetAllJobsQuery, useGetJobQuery, useDeleteJobMutation, useApplyToJobMutation, useCreateJobMutation } = jobsApiSlice;
