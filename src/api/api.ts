import {
    createApi,
    fetchBaseQuery,
    BaseQueryFn,
    FetchBaseQueryError,
    FetchArgs,
} from '@reduxjs/toolkit/query/react';
import { SERVER_URL } from '../constants';
// import {
//     logOut,
//     BasicAuthTokenPayload,
//     SetCredentialPayload,
//     setAuthCredentials,
// } from '../state/slices/authSlice';
// import { RootState } from '../state/store';
// import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';

const baseQuery: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    // const { getState } = api;
    // let token = (getState() as RootState).auth.accessToken;

    // // These routes have thier custom token for authentication
    // if (api.endpoint === 'resetPassword') {
    //     token = (getState() as RootState).auth.passwordResetToken
    // }

    // // if (token) {
    //     headers.set('Authorization', `Bearer ${token}`);
    // }

    const result = await fetchBaseQuery({
        baseUrl: SERVER_URL,
        // credentials: 'include',
        // prepareHeaders: () => headers,
        ...api,
    })(args, api, extraOptions);

    return result;
};

// const baseQueryWithReAuth: BaseQueryFn<
//     string | FetchArgs,
//     unknown,
//     FetchBaseQueryError
// > = async (args, api, extraOptions) => {
//     let result = await baseQuery(args, api, extraOptions);

//     // // I originally wanted to check for 407 status code, but it seems like Fetch doesn't allow me access
//     // // the original response object. So I'm checking for the modified error status from the Fetch library instead.
//     // const invalidAuthorization = result.error?.status === 'FETCH_ERROR'
//     // const badAuth = invalidAuthorization
//     // if (badAuth) {
//     //     const refreshResult = await baseQuery({
//     //         url: '/auth/authtoken',
//     //         method: 'GET'
//     //     }, api, extraOptions) as QueryReturnValue<RefreshResponse, unknown>;

//     //     if (refreshResult.data) {
//     //         const authState = (api.getState() as RootState).auth;
//     //         const { access_token } = refreshResult.data.data;

//     //         const credentials = {
//     //             ...authState, accessToken: access_token,
//     //             isLoggedIn: true,
//     //             credentialType: 'basic',
//     //         } as SetCredentialPayload & BasicAuthTokenPayload;
//     //         api.dispatch(setAuthCredentials(credentials));

//     //         result = await baseQuery(args, api, extraOptions);
//     //     } else {
//     //         api.dispatch(logOut());
//     //         window.location.href = '/login-email';
//     //     }
//     // }

//     return result;
// };

// interface RefreshResponse {
//     data: {
//         access_token: string; 
//     };
// }

export const apiSlice = createApi({
    baseQuery: baseQuery,
    tagTypes: ['User'],
    endpoints: () => ({}),
});

