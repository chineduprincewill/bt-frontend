import { SERVER_URL } from '../constants';
import { ResetPasswordResponse } from '../interfaces/api/authApi';
import { apiSlice } from './api';

const AUTH_URL = SERVER_URL + '/auth';

export interface chatInfoFromApi {
    id: string;
}
export interface UserInfoFromApi {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    otherName: string | null;
    gender: string | null;
    displayImage: string | null;
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
        profileStats?: {
            followingCount: number;
            followersCount: number;
        };
        created: boolean; // This is not in the API response, but I'm adding it here for convenience
    };
    settings: {
        suggestUpgrade: boolean;
    };
    role: {
        name: 'creative' | 'executive' | 'vendor';
    };
}

interface SignupResponse {
    status: 'success';
    message: 'Email verification code sent successfully';
    data: {
        user: UserInfoFromApi;
        verifyToken: string;
    };
}

interface LoginResponse {
    status: 'success';
    message: 'Login successful';
    data: {
        user: UserInfoFromApi;
        accessToken: string;
        refreshToken: string;
    };
}

interface LogoutResponse {
    status: 'success';
    message: 'Logout successful';
    data: null;
}

export interface GetLoggedUserResponse {
    status: 'success';
    message: 'Login successful';
    data: {
        user: UserInfoFromApi;
    };
}

export interface GetChatResponse {
    status: string;
    message: string;
    data: {
        chatToken: string;
    };
}
export interface GetChatConversationIdResponse {
    status: string;
    message: string;
    data: {
        conversationId: string;
    };
}

interface SignupParams {
    email: string;
    firstName: string;
    lastName: string;
    username: string;
}

interface VerifyEmailResponse {
    status: 'success';
    message: 'Email verified successfully';
    data: {
        passwordToken: string;
    };
}
interface SetPasswordResponse {
    status: 'success';
    message: 'Password set successfully';
    data: {
        accessToken: string;
        refreshToken: string;
    };
}

interface ForgotPasswordResponse {
    status: 'success';
    message: 'Reset password instructions sent successfully';
    data: null;
}

interface GetUsernameSuggestionResponse {
    status: 'success';
    message: string;
    data: {
        suggestions: string[];
    };
}

interface SurveyResponse {
    status: 'success';
    message: 'Survey response retrieved successfully';
    data: {
        survey: {
            id: '88b40caf-7db5-48b1-a716-359cb21bd072';
            isReviewed: false;
            userId: 'd13162ff-b882-4797-b28f-5a0454b03572';
            surveyClass: 'form1';
            userResponse: {
                Q1: 'Seeking to expand my connections.';
                Q2: 'chief executive officer';
                Q3: 'Black@ corp';
                Q4: 'global standard';
                Q5: 'Yes';
                Q6: 'Hands-on and operational';
                Q7: 'All of the above';
                Q8: 'Black American';
                Q9: 'Over 10 years';
                Q10: 'https://www.linkedin.com/testacct';
            };
            roleType: 'executive';
            updatedAt: '2024-01-05T00:35:50.120Z';
            createdAt: '2024-01-05T00:35:50.120Z';
        };
    };
}

interface LoginParams {
    email?: string;
    password: string;
    username?: string;
}

interface SurveyParams {
    userResponse: Record<string, string>;
    roleType: 'executive' | 'vendor' | 'creative';
}

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        signup: builder.mutation<SignupResponse, SignupParams>({
            query: (credentials: SignupParams) => ({
                url: AUTH_URL + '/signup',
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: ['User'],
        }),

        getChatToken: builder.query<GetChatResponse, null>({
            query: () => ({
                url: AUTH_URL + '/chat-token',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        'accessToken',
                    )}`,
                },
            }),
        }),
        getChatConversationId: builder.mutation<GetChatConversationIdResponse, {memberUid: string}>({
            query: ({memberUid}) => ({
                url: AUTH_URL + `/chat-conversationId?memberUid=${memberUid}`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        'accessToken',
                    )}`,
                },
            }),
        }),
        getLoggedUser: builder.mutation<null, GetLoggedUserResponse>({
            query: () => ({
                url: AUTH_URL + '/loggeduser',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        'accessToken',
                    )}`,
                },
            }),
        }),
        login: builder.mutation<LoginResponse, LoginParams>({
            query: (credentials: { email: string; password: string }) => ({
                url: AUTH_URL + '/login',
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: ['User'],
        }),
        logout: builder.mutation<LogoutResponse, void>({
            query: () => ({
                url: AUTH_URL + '/logout',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:
                        'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
        verifyEmail: builder.mutation<
            VerifyEmailResponse,
            { email: string; otpCode: string }
        >({
            query: ({ email, otpCode }) => {
                console.log({
                    accessToken: localStorage.getItem('accessToken'),
                });

                return {
                    url: AUTH_URL + '/verifyemail',
                    method: 'POST',
                    body: { email, otpCode },
                    header: {
                        Authorization:
                            `Bearer ` + localStorage.getItem('accessToken'),
                    },
                };
            },
        }),
        reVerifyEmail: builder.mutation<VerifyEmailResponse, { email: string }>(
            {
                query: ({ email }) => ({
                    url: AUTH_URL + `/resendverifyemail?email=${email}`,
                    method: 'GET',
                }),
            },
        ),
        setPassword: builder.mutation<
            SetPasswordResponse,
            { email: string; password: string; passwordToken: string }
        >({
            query: ({ email, password, passwordToken }) => ({
                url: AUTH_URL + '/setpassword',
                method: 'POST',
                body: { email, password },
                headers: {
                    Authorization: `Bearer ${passwordToken}`,
                },
            }),
        }),
        forgotPassword: builder.mutation<
            ForgotPasswordResponse,
            { email: string }
        >({
            query: ({ email }) => ({
                url: AUTH_URL + '/forgotpassword',
                method: 'POST',
                body: {
                    email,
                    redirectUrl: 'https://blkat.io/reset-password',
                },
            }),
        }),
        resetPassword: builder.mutation<
            ResetPasswordResponse,
            { email: string; newPassword: string; passwordToken: string }
        >({
            query: ({ email, newPassword, passwordToken }) => ({
                url: AUTH_URL + '/resetpassword',
                method: 'POST',
                body: { email, newPassword, resetToken: passwordToken },
                headers: {
                    Authorization: `Bearer ${passwordToken}`,
                },
            }),
        }),
        changePassword: builder.mutation<
            ResetPasswordResponse,
            { oldPassword: string; newPassword: string }
        >({
            query: ({ oldPassword, newPassword }) => ({
                url: AUTH_URL + '/changepassword',
                method: 'POST',
                body: { oldPassword, newPassword },
                headers: {
                    Authorization:
                        `Bearer ` + localStorage.getItem('accessToken'),
                },
            }),
        }),
        getUsernameSuggestion: builder.mutation<
            GetUsernameSuggestionResponse,
            { email: string; firstName: string; lastName: string }
        >({
            query: ({ email, firstName, lastName }) => ({
                url: AUTH_URL + '/suggest/username',
                method: 'POST',
                body: { email, firstName, lastName },
            }),
        }),
        submitSurvey: builder.mutation<SurveyResponse, SurveyParams>({
            query: (credentials: SurveyParams) => ({
                url: AUTH_URL + '/submit-survey',
                method: 'POST',
                headers: {
                    Authorization:
                        `Bearer ` + localStorage.getItem('accessToken'),
                },
                body: {
                    surveyClass: 'form1',
                    userResponse: credentials.userResponse,
                    roleType: credentials.roleType,
                },
            }),
        }),
        contactSupport: builder.mutation<
            {
                status: 'success';
                message: 'Support-Request sent successfully';
                data: null;
            },
            {
                email: string;
                name: string;
                subject: string;
                message: string;
                type: 'bug' | 'contact';
            }
        >({
            query: ({ message, email, name, subject, type }) => ({
                url: AUTH_URL + '/contact-us',
                method: 'POST',
                headers: {
                    Authorization:
                        `Bearer ` + localStorage.getItem('accessToken'),
                },
                body: {
                    message,
                    email,
                    name,
                    subject,
                    type: type === 'contact' ? 'Support-Request' : 'Bug-Report',
                },
            }),
        }),
    }),
});

export type {};
export const {
    useSignupMutation,
    useVerifyEmailMutation,
    useReVerifyEmailMutation,
    useSetPasswordMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useSubmitSurveyMutation,
    useGetUsernameSuggestionMutation,
    useLoginMutation,
    useLogoutMutation,
    useChangePasswordMutation,
    useContactSupportMutation,
    useGetChatTokenQuery,
    useGetChatConversationIdMutation,
} = authApiSlice;
