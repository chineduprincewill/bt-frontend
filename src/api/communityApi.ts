import { SERVER_URL } from 'constants';
import { apiSlice } from './api';
import { VillageMembershipResponse } from '@type/village';
import {
    AllCommunitiesResponse,
    AllCommunityMembersResponse,
    CommunityFeedResponse,
    CreateCommunityResponse,
    SendInviteResponse,
    SingleCommunity,
    SingleCommunityResponse,
} from '@type/community';
import { CreatePostResponse } from './postApi';

const communitySlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllCommunities: builder.query<AllCommunitiesResponse, string>({
            query: (community) => ({
                url: SERVER_URL + '/community/all?q=' + community,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
        createCommunity: builder.mutation<CreateCommunityResponse, { name: string; reason: string; description: string }>({
            query: ({ name, reason, description }) => ({
                url: SERVER_URL + '/community',
                method: 'POST',
                body: { name, reason, description },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
        requestCommunityMembership: builder.mutation<VillageMembershipResponse, string>({
            query: (communityId) => ({
                url: SERVER_URL + '/community/request-membership?communityId=' + communityId,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
        getSingleCommunity: builder.query<SingleCommunityResponse, string>({
            query: (communityId) => ({
                url: SERVER_URL + '/community?communityId=' + communityId,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
        getAllCommunityMembers: builder.query<AllCommunityMembersResponse, string>({
            query: (communityId) => ({
                url: SERVER_URL + '/community/members?communityId=' + communityId,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
        acceptCommunityMember: builder.mutation<{ status: string; message: string }, { communityId: string; profileId: string }>({
            query: ({ communityId, profileId }) => ({
                url: SERVER_URL + '/community/accept-membership?communityId=' + communityId + '&profileId=' + profileId,
                method: 'PATCH',
                body: { communityId, profileId },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
        getCommunityFeed: builder.query<CommunityFeedResponse, string>({
            query: (communityId) => ({
                url: SERVER_URL + '/feeds/community?communityId=' + communityId,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
        postOnCommunityFeed: builder.mutation<CommunityFeedResponse, { communityId: string; caption: string }>({
            query: ({ communityId, caption }) => ({
                url: SERVER_URL + '/posts/new',
                body: {
                    postData: {
                        caption,
                    },
                    communityId,
                },
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),

        createPostForCommunity: builder.mutation<
            CreatePostResponse,
            {
                postData: {
                    caption: string;
                    location: string;
                    originalPostId?: string;
                };
                communityId?: string;
                villageId?: string;
                lat?: number;
                lon?: number;
                withContent: boolean;
            }
        >({
            query: ({ postData, communityId, villageId, withContent, lat, lon }) => ({
                url: SERVER_URL + '/posts/new',
                method: 'POST',
                body: {
                    postData: { ...postData, location: undefined },
                    communityId,
                    villageId,
                    withContent,
                    lat,
                    lon,
                },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
        sendCommunityInvite: builder.mutation<SendInviteResponse, { inviteeId: string; communityId: string }>({
            query: ({ inviteeId, communityId }) => ({
                url: SERVER_URL + '/community/invite',
                method: 'POST',
                body: {
                    inviteeId,
                    communityId,
                },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
        blockMember: builder.mutation<{ status: string; message: string }, { communityId: string; profileId: string }>({
            query: ({ communityId, profileId }) => ({
                url: SERVER_URL + '/community/block-membership?communityId=' + communityId + '&profileId=' + profileId,
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
        leaveCommunity: builder.mutation<{ status: string; message: string }, { communityId: string; memberId: string }>({
            query: ({ communityId, memberId }) => ({
                url: SERVER_URL + '/community/leave',
                body: {
                    communityId,
                    memberId,
                },
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
    }),
});

export const {
    useGetAllCommunitiesQuery,
    useCreateCommunityMutation,
    useGetSingleCommunityQuery,
    useRequestCommunityMembershipMutation,
    useGetAllCommunityMembersQuery,
    useAcceptCommunityMemberMutation,
    useGetCommunityFeedQuery,
    usePostOnCommunityFeedMutation,
    useSendCommunityInviteMutation,
    useCreatePostForCommunityMutation,
    useLeaveCommunityMutation,
} = communitySlice;
