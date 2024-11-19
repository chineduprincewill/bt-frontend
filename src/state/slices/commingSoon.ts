import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CommingSoonState {
    show: boolean
}

const initialState: CommingSoonState = {
    show: false,
};

export const commingSoonSlice = createSlice({
    name: "profile",
    initialState: initialState,
    reducers: {
        toggleCommingSoonModal: (state, action: PayloadAction<CommingSoonState>) => {
            state.show = action.payload.show
        },
        clearCommingSoonData: (state) => {
            state.show = false
        }
    },
});

export const { toggleCommingSoonModal, clearCommingSoonData } = commingSoonSlice.actions;
export type {
    CommingSoonState
};
export default commingSoonSlice.reducer;
