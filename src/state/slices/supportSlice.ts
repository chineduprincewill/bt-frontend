import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface SupportState {
    show: boolean,
    type: 'bug' | 'contact'
}

const initialState: SupportState = {
    show: false,
    type: 'contact'
};

export const supportSlice = createSlice({
    name: "support",
    initialState: initialState,
    reducers: {
        toggleTalkToSupportModal: (state, action: PayloadAction<SupportState>) => {
            state.show = action.payload.show,
            state.type = action.payload.type
        }
    },
});

export const { toggleTalkToSupportModal } = supportSlice.actions;
export type {
    SupportState
};
export default supportSlice.reducer;
