import { SERVER_URL } from '../constants';
import { ApiResponse } from '../types/common';
import { apiSlice } from './api';

const CONNECTION_URL = SERVER_URL + '/connections';

interface SuccessResponse {
    status: 'success';
    message: 'Connection followed successfully';
    data: null;
}

export interface UserProfileFull {
    [x: string]: any;
    id: string;
    bio: string;
    location: string;
    address: string | null;
    about: string;
    phone: string;
    userId: string;
    createdAt: string;
    status: 'pending' | 'accepted' | 'rejected';
    updatedAt: string;
    profileStats: {
        followersCount: number;
        followingCount: number;
    };
    follower?: {
        id: string;
        user: {
            username: string;
            displayImage?: string;
            firstName: string;
            id: string;
            lastName: string;
        };
    };
    following?: {
        id: string;
        user: {
            username: string;
            displayImage?: string;
            firstName: string;
            id: string;
            lastName: string;
        };
    };
}

interface GetSuggestedConnections {
    status: 'success';
    message: 'Suggsted connections retrieved successfully';
    data: {
        id: 'dbe41535-7b64-4338-8c52-55a9caa37495';
        bio: 'Cisco has 20+ years of production experience, his award winning producing has enabled him to produce content on four continents.';
        location: 'Atlanta, GA USA';
        address: null;
        socials: null;
        about: 'He has produced commercials, music videos, shorts and branded content with a short list that includes: Hype Williams, Spike Jonze, Bille Woodruff, James Larese, Chris Robinson and Kai Crawford to name a few.';
        phone: null;
        userId: '642bd7c2-c5e1-4be8-bfab-d18084c8d23a';
        createdAt: '2024-01-26T16:19:38.220Z';
        updatedAt: '2024-01-26T16:19:38.220Z';
        user: {
            username: 'ciscon';
            id: '642bd7c2-c5e1-4be8-bfab-d18084c8d23a';
            firstName: 'Cisco';
            lastName: 'Newman';
            displayImage: null;
        };
    }[];
}

interface GetFollowingApiResponse {
    status: string;
    message: string;
    data: UserProfileFull[];
}

export interface SearchConnectionResponse {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    display?: string;
    profile: {
        id: string;
    };
}
export const connectionApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        followProfile: builder.mutation<SuccessResponse, { username: string }>({
            query: ({ username }) => ({
                url: CONNECTION_URL + `/follow/profile`,
                method: 'GET',
                params: {
                    username,
                },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
        unFollowProfile: builder.mutation<SuccessResponse, { username: string }>({
            query: ({ username }) => ({
                url: CONNECTION_URL + `/unfollow/profile`,
                method: 'GET',
                params: {
                    username,
                },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
        searchConnections: builder.query<ApiResponse<SearchConnectionResponse[]>, string>({
            query: (q) => ({
                url: CONNECTION_URL + '/search',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
                params: {
                    q,
                },
            }),
        }),
        getConnections: builder.query<
            GetFollowingApiResponse,
            {
                type: 'following' | 'followers' | 'incoming' | 'outgoing' | 'rejected';
                username?: string;
            }
        >({
            query: ({ type, username }) => {
                return {
                    url: CONNECTION_URL + '/profile',
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                    },
                    params: {
                        username,
                        type,
                    },
                };
            },
        }),
        updateConnection: builder.mutation<SuccessResponse, { username: string; type: 'accepted' | 'rejected' }>({
            query: ({ username, type }) => ({
                url: CONNECTION_URL + '/profile/action',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
                params: {
                    username,
                    action: type,
                },
            }),
        }),
        getSuggestedConnections: builder.query<GetSuggestedConnections, undefined>({
            query: () => ({
                url: CONNECTION_URL + '/suggested-connections',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
    }),
});

export const {
    // Export other hooks...
    useFollowProfileMutation,
    useUpdateConnectionMutation,
    useSearchConnectionsQuery,
    useGetConnectionsQuery,
    useUnFollowProfileMutation,
    useGetSuggestedConnectionsQuery,
} = connectionApiSlice;
