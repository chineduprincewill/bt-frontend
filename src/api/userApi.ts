import { SERVER_URL } from '../constants';
import { apiSlice } from './api';
import { UserInfoFromApi } from './authApi';

const USER_AUTH = SERVER_URL + '/user';

// Assuming these types based on the UserController implementation
export type UserBasicInfo = {
    username: string;
    id: string;
    firstName: string;
    lastName: string;
    otherName: string | null;
    displayImage: string | null;
    role: {
        name: 'executive' | 'creative' | 'vendor';
    };
    profile?: {
        location: {
            city: string;
            state: string;
            value: string;
            country: string;
            countryCode: string;
        };
        address: {
            city: string;
            state: string;
            street: string;
            country: string;
            countryCode: string;
        };
        bio: string;
        about: string;
        phone: string;
    };
};

type PaginatedUsersResponse = {
    status: string;
    message: string;
    data: {
        users: UserBasicInfo[];
        total: number;
        page: number;
        size: number;
    };
};

type UserDetailResponse = {
    status: string;
    message: string;
    data: UserBasicInfo;
};

type UpdateUserPayload = {
    firstName?: string;
    lastName?: string;
    otherName?: string;
    gender?: string;
    uploadKey?: string;
    suggestUpgrade?: boolean;
    file?: File;
};

type UpdateUserResponse = {
    status: string;
    message: string;
    data: UserBasicInfo;
};

type FindUserResponse = {
    status: string;
    message: string;
    data: UserBasicInfo[];
};

interface GetCloudLinkResponse {
    status: 'success';
    message: 'upload successful';
    data: {
        info: {
            url: string;
        };
    };
}
4;
interface GetLoggedUserResponse {
    status: 'success';
    message: 'Login successful';
    data: {
        user: UserInfoFromApi;
    };
}

type UploadProfileImageResponse = {
    status: string;
    message: string;
    data: {
        preSignedUrl: string;
        instructions: string;
    };
};

type QueryParams = {
    page?: number;
    size?: number;
};

type SearchParams = {
    q: string;
};

export interface UserInfoFromApiWithProfileId {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    otherName: string | null;
    gender: string | null;
    displayImage?: string;
    username: string;
    isBlocked: boolean;
    status: {
        activated: boolean;
        emailVerified: boolean;
    };
    referrals: number;
    createdAt: string;
    updatedAt: string;
    profile: {
        id: string;
        location: {
            value: string;
        };
        address: string;
        bio: string;
        about: string;
        phone: string;
        created: boolean; // This is not in the API response, but I'm adding it here for convenience
    };
    settings: {
        suggestUpgrade: boolean;
    };
    role: {
        name: 'creative' | 'executive' | 'vendor';
    };
}
type SearchUserResponse = {
    status: 'success';
    message: 'User retrieved successfully';
    data: {
        username: string;
        fullName: string;
        id: string;
        firstName: string;
        lastName: string;
        displayImage: string;
        role: {
            name: string;
        };
        profile: {
            location: string | null;
            address: string | null;
            bio: string;
            id: string;
        };
    }[];
};

interface GetProfileUploadLinkResponse {
    status: 'success';
    message: 'Pre-signed URL generated successfully';
    data: {
        preSignedUrl: string;
        uploadKey: string;
        instructions: string;
    };
}

interface InviteUserResponse {
    status: 'success';
    message: 'Referral invite sent successfully';
    data: {
        totalReferrals: number;
    };
}

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query<PaginatedUsersResponse, QueryParams>({
            query: (queryParams) => ({
                url: USER_AUTH + '/',
                method: 'GET',
                params: queryParams,
            }),
        }),
        getUserDetail: builder.query<UserDetailResponse, { username: string }>({
            query: (queryParams) => ({
                url: USER_AUTH + '/detail',
                method: 'GET',
                params: queryParams,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            }),
            transformErrorResponse: () => undefined,
        }),
        updateUser: builder.mutation<UpdateUserResponse, UpdateUserPayload>({
            query: (updateData) => {
                let body: typeof updateData | FormData = updateData;
                if (updateData.file) {
                    body = new FormData();
                    body.append('file', updateData.file);
                    body.append('firstName', updateData.firstName ?? '');
                    body.append('lastName', updateData.lastName ?? '');
                    body.append('otherName', updateData.otherName ?? '');
                    body.append('gender', updateData.gender ?? '');
                    body.append('uploadKey', updateData.uploadKey ?? '');
                    body.append('suggestUpgrade', updateData.suggestUpgrade ? 'true' : 'false');
                } else if (updateData.suggestUpgrade !== undefined) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    /**
                     * The API only checks for string 'true' or 'false' values
                     */
                    (updateData as any).suggestUpgrade = updateData.suggestUpgrade ? 'true' : 'false';
                }

                return {
                    url: USER_AUTH + '/update',
                    method: 'PATCH',
                    body: body,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                };
            },
        }),
        findUser: builder.query<FindUserResponse, SearchParams>({
            query: (searchParams) => ({
                url: USER_AUTH + '/search',
                method: 'GET',
                params: searchParams,
            }),
        }),
        referUser: builder.mutation<InviteUserResponse, { email: string }>({
            query: ({ email }) => {
                return {
                    url: USER_AUTH + '/refer-user',
                    method: 'POST',
                    body: { email },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                };
            },
        }),
        getProfileUploadLink: builder.mutation<GetProfileUploadLinkResponse, { mimeType: string; fileName: string; fileSizeInBytes: number }>({
            query: ({ mimeType, fileName, fileSizeInBytes }) => ({
                url: USER_AUTH + '/upload/profile-url',
                method: 'POST',
                body: { mimeType, fileName, fileSizeInBytes },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
        uploadProfileImage: builder.mutation<UploadProfileImageResponse, FormData>({
            query: (formData) => ({
                url: USER_AUTH + '/upload/profile-url',
                method: 'GET',
                body: formData,
            }),
        }),
        // Existing endpoint
        getLoggedInUserInfo: builder.query<GetLoggedUserResponse, null>({
            query: () => ({
                url: SERVER_URL + '/auth/loggeduser',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            }),
        }),
        fetchLoggedInUserInfo: builder.mutation<GetLoggedUserResponse, null>({
            query: () => ({
                url: SERVER_URL + '/auth/loggeduser',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            }),
        }),
        getCloudinaryLink: builder.mutation<GetCloudLinkResponse, { file: File; type: string }>({
            query: ({ file, type }) => {
                const formData = new FormData();
                formData.append('file', file);
                return {
                    url: USER_AUTH + `/upload/data?type=${type}`,
                    method: 'POST',
                    body: formData,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                };
            },
        }),
        searchForUsersWithQuery: builder.mutation<SearchUserResponse, { query: string }>({
            query: ({ query }) => ({
                url: USER_AUTH + '/search',
                method: 'GET',
                params: { q: query },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            }),
        }),
    }),
});

export const {
    useReferUserMutation,
    useGetAllUsersQuery,
    useGetUserDetailQuery,
    useUpdateUserMutation,
    useFindUserQuery,
    useUploadProfileImageMutation,
    useGetLoggedInUserInfoQuery,
    useGetProfileUploadLinkMutation,
    useFetchLoggedInUserInfoMutation,
    useGetCloudinaryLinkMutation,
    useSearchForUsersWithQueryMutation,
} = userApiSlice;
