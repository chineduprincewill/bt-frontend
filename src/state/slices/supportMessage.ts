import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ContactSupportMessageState {
    messageType: 'bug' | 'contact'
}

const initialState: ContactSupportMessageState = {
    messageType: 'contact'
};

export const supportMessageSlice = createSlice({
    name: "about",
    initialState: initialState,
    reducers: {
        setSupportMessageType: (state, action: PayloadAction<ContactSupportMessageState>) => {
            state.messageType = action.payload.messageType
        },
        resetSupportMessageType: (state) => {
            state.messageType = 'contact'
        }
    },
});

export const { setSupportMessageType, resetSupportMessageType } = supportMessageSlice.actions;
export type {
    ContactSupportMessageState
};
export default supportMessageSlice.reducer;
