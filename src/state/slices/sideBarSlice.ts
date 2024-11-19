import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface SidebarState {
    paneToShow: 'feeds' | 'messages' | 'events' | 'more' | 'connections'
}

const initialState: SidebarState = {
    paneToShow: 'feeds',
};

export const sideBarSlice = createSlice({
    name: "sidebar",
    initialState: initialState,
    reducers: {
        selectSidebarMenu: (state, action: PayloadAction<SidebarState>) => {
            state.paneToShow = action.payload.paneToShow
        },
    },
});

export const { selectSidebarMenu } = sideBarSlice.actions;
export type {
    SidebarState
};
export default sideBarSlice.reducer;
