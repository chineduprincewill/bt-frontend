import { SERVER_URL } from '../constants';
import { ProfileAvailabilityResponse } from '../types/availability';
import { ApiResponse } from '../types/common';
import {
    ISetAvailabilityRequest,
    ISetAvailabilityResponse,
    MentorshipRequestPayload,
    MentorshipRequestResponse,
    MentorshipRequestsResponse,
    MentorshipResponse,
    SingleMentorshipResponse,
    ProfileAvailabilityResponseMentorship,
    SingleMentorshipRequestResponse,
} from '../types/mentorship';
import { apiSlice } from './api';

export const mentorshipApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        setAvailibility: builder.mutation<ApiResponse<ISetAvailabilityResponse>, ISetAvailabilityRequest>({
            query: (body) => ({
                url: `${SERVER_URL}/availability`,
                method: 'POST',
                body,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
        getAllMentorships: builder.query<MentorshipResponse, { q?: string; category?: string; profileId?: string }>({
            query: (params) => ({
                url: `${SERVER_URL}/mentorship`,
                params,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
        getMentorshipsCategory: builder.query<MentorshipResponse, string>({
            query: (category) => ({
                url: `${SERVER_URL}/mentorship?category=${category}`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
        viewSingleMentorship: builder.query<SingleMentorshipResponse, string>({
            query: (id: string) => ({
                url: `${SERVER_URL}/mentorship/single?mentorshipId=${id}`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
        getAvailability: builder.query<ProfileAvailabilityResponseMentorship, string>({
            query: (profileId: string) => ({
                url: `${SERVER_URL}/availability?profileId=${profileId}`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
        requestMentorship: builder.mutation<MentorshipRequestResponse, MentorshipRequestPayload>({
            query: (credentials) => ({
                url: `${SERVER_URL}/mentorship/request`,
                method: 'POST',
                body: credentials,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
        publishVideo: builder.mutation({
            query: (masterclassId: string) => ({
                url: `${SERVER_URL}/masterclass/publish?masterclassId=${masterclassId}`,
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
        viewMentorshipAsMentor: builder.query<MentorshipRequestsResponse, { mentorId: string; userType: string }>({
            query: ({ mentorId, userType }) => ({
                url: `${SERVER_URL}/mentorship/request?${userType}=${mentorId}`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
        viewUpcomingMentorshipRequeests: builder.query<MentorshipRequestsResponse, string>({
            query: (status: string) => ({
                url: `${SERVER_URL}/mentorship/request?status=${status}`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
        updateMentorshipRequest: builder.mutation({
            query: (credentials) => ({
                url: `${SERVER_URL}/mentorship/request?mentorshipRequestId=${credentials.mentorshipRequestId}`,
                method: 'PATCH',
                body: {
                    chosenTime: credentials.chosenTime,
                    chosenDate: credentials.chosenDate,
                    reason: credentials.reason,
                    status: credentials.status,
                },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
        createMentorshipSession: builder.mutation({
            query: (credentials) => ({
                url: `${SERVER_URL}/mentorship/`,
                method: 'POST',
                body: credentials,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
        declineMentorshipRequest: builder.mutation({
            query: (credentials) => ({
                url: `${SERVER_URL}/mentorship/request?mentorshipRequestId=${credentials.mentorshipRequestId}`,
                method: 'PATCH',
                body: {
                    chosenTime: credentials.chosenTime,
                    chosenDate: credentials.chosenDate,
                    reason: credentials.reason,
                    status: credentials.status,
                },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
        cancelMentorshipRequestAsMentee: builder.mutation({
            query: (mentorshipRequestId: string) => ({
                url: `${SERVER_URL}/mentorship/request?mentorshipRequestId=${mentorshipRequestId}`,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
        getSingleMentorshipRequest: builder.query<SingleMentorshipRequestResponse, string>({
            query: (mentorshipRequestId: string) => ({
                url: `${SERVER_URL}mentorship/request/single?mentorshipRequestId=${mentorshipRequestId}`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
        cancelMentorshipAsMentee: builder.mutation({
            query: (mentorshipRequestId: string) => ({
                url: `${SERVER_URL}/mentorship/request?mentorshipRequestId=${mentorshipRequestId}`,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
    }),
});

export const {
    useSetAvailibilityMutation,
    useGetAllMentorshipsQuery,
    useGetMentorshipsCategoryQuery,
    useViewSingleMentorshipQuery,
    useGetAvailabilityQuery,
    useRequestMentorshipMutation,
    usePublishVideoMutation,
    useViewMentorshipAsMentorQuery,
    useViewUpcomingMentorshipRequeestsQuery,
    useUpdateMentorshipRequestMutation,
    useDeclineMentorshipRequestMutation,
    useCreateMentorshipSessionMutation,
    useGetSingleMentorshipRequestQuery,
    useCancelMentorshipAsMenteeMutation,
} = mentorshipApiSlice;
