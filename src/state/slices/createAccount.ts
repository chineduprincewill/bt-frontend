import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
    id: string;
    displayImage: string | null;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    type: 'executive' | 'vendor' | 'creative';
    profile: {
        id: string;
    };
}
let userData = localStorage.getItem('user');
userData = userData === 'undefined' ? null : userData;
const user: User = JSON.parse(userData ?? '{}');
interface CreateAccountState {
    user: User;
}

const initialState: CreateAccountState = {
    user: user,
};

export const createAccountSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setCreateAccountDetails: (state, action: PayloadAction<{ [K in keyof User]?: User[K] }>) => {
            state.user = { ...state.user, ...action.payload };
            localStorage.setItem('user', JSON.stringify(state.user));
        },
        clear: () => {
            localStorage.removeItem('user');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('passwordResetToken');
        },
    },
});

export const { clear, setCreateAccountDetails } = createAccountSlice.actions;
export type { User, CreateAccountState };
export default createAccountSlice.reducer;
