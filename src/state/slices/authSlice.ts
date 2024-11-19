import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { GetLoggedUserResponse } from '../../api/authApi';

interface BasicAuthTokenPayload {
    credentialType: 'basic';
    accessToken: string;
    refreshToken: string;
}
interface PasswordResetAuthTokenPayload {
    credentialType: 'passwordReset';
    passwordResetToken: string;
}
type AuthTokenPayload = BasicAuthTokenPayload | PasswordResetAuthTokenPayload;

type SetCredentialPayload = AuthTokenPayload;

interface User {
    firstname: string;
    lastname: string;
    email: string;
    role: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
}
let userData = localStorage.getItem('user');
userData = userData === 'undefined' ? null : userData;
const user: User = JSON.parse(userData ?? '{}');

// If user.profile is undefined
// set default values

interface AuthState {
    user: User | null;
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    emailVerificationToken?: string;
    passwordResetToken?: string;
    accessToken?: string;
    refreshToken?: string;
    isLoggedIn: boolean;
}

interface LoggedInUserState {
    loggedUser?: GetLoggedUserResponse['data']['user'];
}

const initialState: AuthState & LoggedInUserState = {
    user: user ?? null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    emailVerificationToken: undefined,
    passwordResetToken: undefined,
    accessToken: localStorage.getItem('accessToken') as string,
    refreshToken: localStorage.getItem('refreshToken') as string,
    isLoggedIn: !!localStorage.getItem('accessToken'),
};

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setAuthToken: (state, action: PayloadAction<AuthTokenPayload>) => {
            switch (action.payload.credentialType) {
                case 'basic':
                    state.accessToken = action.payload.accessToken;
                    state.refreshToken = action.payload.refreshToken;
                    state.isLoggedIn = action.payload.accessToken ? true : false;
                    localStorage.setItem('accessToken', action.payload.accessToken);
                    localStorage.setItem('refreshToken', action.payload.refreshToken);
                    break;
                case 'passwordReset':
                    state.passwordResetToken = action.payload.passwordResetToken;
                    localStorage.setItem('refreshToken', action.payload.passwordResetToken);
                    break;
            }
        },
        setAuthCredentials: (state, action: PayloadAction<SetCredentialPayload>) => {
            switch (action.payload.credentialType) {
                case 'basic':
                    state.accessToken = action.payload.accessToken;
                    state.refreshToken = action.payload.refreshToken;
                    state.isLoggedIn = action.payload.accessToken ? true : false;
                    localStorage.setItem('accessToken', action.payload.accessToken);
                    localStorage.setItem('refreshToken', action.payload.refreshToken);
                    break;
                case 'passwordReset':
                    state.passwordResetToken = action.payload.passwordResetToken;
                    localStorage.setItem('refreshToken', action.payload.passwordResetToken);
                    break;
            }
        },
        updateLoggedUser: (state, action: PayloadAction<Partial<LoggedInUserState['loggedUser']>>) => {
            state.loggedUser = { ...(state.loggedUser ?? {}), ...action.payload } as LoggedInUserState['loggedUser'];
            localStorage.setItem('user', JSON.stringify(state.loggedUser));
        },
        setUser: (state, action: PayloadAction<GetLoggedUserResponse['data']['user']>) => {
            state.loggedUser = { ...action.payload, status: { activated: false, emailVerified: true } };

            if (!state.loggedUser.profile) {
                state.loggedUser.profile = {
                    id: '',
                    location: {
                        value: '',
                    },
                    address: '',
                    bio: '',
                    about: '',
                    phone: '',
                    created: false,
                };
            } else {
                state.loggedUser.profile = {
                    ...state.loggedUser.profile,
                    created: true,
                };
            }
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        setUserRealUser: (state, action: PayloadAction<GetLoggedUserResponse['data']['user']>) => {
            //@ts-ignore
            state.user = action.payload; // Directly store user information
            // You can also add more logic to manipulate the user data as needed before storing it

            localStorage.setItem('user', JSON.stringify(state.user));
        },
        logOutUser: (state) => {
            state.user = null;
            state.accessToken = '';
            state.refreshToken = '';
            state.emailVerificationToken = '';
            state.passwordResetToken = '';
            state.isLoggedIn = false;

            localStorage.removeItem('user');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('passwordResetToken');
            window.location.reload();
        },
    },
});

export const { logOutUser, setAuthCredentials, setAuthToken, setUser, updateLoggedUser } = authSlice.actions;
export type { AuthState, SetCredentialPayload, User, AuthTokenPayload, BasicAuthTokenPayload, PasswordResetAuthTokenPayload };
export default authSlice.reducer;
