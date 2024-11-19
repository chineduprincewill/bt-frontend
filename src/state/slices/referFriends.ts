import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ReferFriendsState {
    show: boolean
}

const initialState: ReferFriendsState = {
    show: false,
};

export const referFriendsSlice = createSlice({
    name: "profile",
    initialState: initialState,
    reducers: {
        toggleReferFriendsModal: (state, action: PayloadAction<ReferFriendsState>) => {
            state.show = action.payload.show
        },
        clearReferFriendsData: (state) => {
            state.show = false
        }
    },
});

export const { toggleReferFriendsModal, clearReferFriendsData } = referFriendsSlice.actions;
export type {
    ReferFriendsState
};
export default referFriendsSlice.reducer;
