import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface Token {
    id: string;
}

let tokenData = localStorage.getItem('chatToken');
tokenData = tokenData === 'undefined' ? null : tokenData;
const token: Token = JSON.parse(tokenData ?? '{}');
interface ChatTokenState {
    token: Token;
}

const initialState: ChatTokenState = {
    token: token,
};

export const chatTokenSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setChatToken: (
            state,
            action: PayloadAction<{ [K in keyof Token]?: Token[K] }>,
        ) => {
            state.token = { ...state.token, ...action.payload };
            localStorage.setItem('chatToken', JSON.stringify(state.token));
        },
        clear: () => {
            localStorage.removeItem('chatToken');
        },
    },
});

export const { clear, setChatToken } = chatTokenSlice.actions;
export type { Token as User, ChatTokenState as CreateAccountState };
export default chatTokenSlice.reducer;
