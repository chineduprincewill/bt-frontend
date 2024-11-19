import { SERVER_URL } from 'constants';
import { apiSlice } from './api';
import { VillagesResponse, VillageResponse, VillageMembershipResponse, AllMembersResponse } from '@type/village';
import { CommunityFeedResponse } from '@type/community';
import { CreatePostResponse } from './postApi';
import { SendInviteResponse } from '@type/community';

const villageSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllVillages: builder.query<VillagesResponse, string>({
            query: (village) => ({
                url: SERVER_URL + '/village/all?q=' + village,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
        requestMembership: builder.mutation<VillageMembershipResponse, string>({
            query: (villageId) => ({
                url: SERVER_URL + '/village/request-membership?villageId=' + villageId,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
        getSingleVillage: builder.query<VillageResponse, string>({
            query: (villageId) => ({
                url: SERVER_URL + '/village?villageId=' + villageId,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
        getAllVillageMembers: builder.query<AllMembersResponse, string>({
            query: (villageId) => ({
                url: SERVER_URL + '/village/members?villageId=' + villageId,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
        acceptVillageMember: builder.mutation<VillageMembershipResponse, { villageId: string; profileId: string }>({
            query: ({ profileId, villageId }) => ({
                url: SERVER_URL + '/village/accept-membership?villageId=' + villageId + '&profileId=' + profileId,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
        getVillageFeed: builder.query<CommunityFeedResponse, string>({
            query: (villageId) => ({
                url: SERVER_URL + '/feeds/village?villageId=' + villageId,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
        declineVillageMember: builder.mutation<VillageMembershipResponse, { villageId: string; profileId: string }>({
            query: ({ villageId, profileId }) => ({
                url: SERVER_URL + '/village/decline-membership?villageId=' + villageId + '&profileId=' + profileId,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
        createPostForVillage: builder.mutation<
            CreatePostResponse,
            {
                postData: {
                    caption: string;
                    location: string;
                    originalPostId?: string;
                };

                villageId?: string;
                lat?: number;
                lon?: number;
                withContent: boolean;
            }
        >({
            query: ({ postData, withContent, villageId, lat, lon }) => ({
                url: SERVER_URL + '/posts/new',
                method: 'POST',
                body: {
                    postData: { ...postData, location: undefined },
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
        sendVillageInvite: builder.mutation<SendInviteResponse, { inviteeId: string; type: string; villageId: string }>({
            query: ({ inviteeId, villageId }) => ({
                url: SERVER_URL + '/village/invite',
                method: 'POST',
                body: {
                    inviteeId,
                    villageId,
                },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
        blockVillageMember: builder.mutation<VillageMembershipResponse, { villageId: string; profileId: string }>({
            query: ({ villageId, profileId }) => ({
                url: SERVER_URL + '/village/block-membership?villageId=' + villageId + '&profileId=' + profileId,
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
    useGetAllVillagesQuery,
    useRequestMembershipMutation,
    useGetSingleVillageQuery,
    useGetAllVillageMembersQuery,
    useAcceptVillageMemberMutation,
    useGetVillageFeedQuery,
    useBlockVillageMemberMutation,
    useCreatePostForVillageMutation,
    useSendVillageInviteMutation,
} = villageSlice;
