import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface HeaderSidebarSlice {
    show: boolean,
    page: 'home' | 'about',
    showProfileDropdown?: boolean
}

const initialState: HeaderSidebarSlice = {
    show: false,
    page: 'home',
    showProfileDropdown: false
};

export const headerSidebarSlice = createSlice({
    name: "header",
    initialState: initialState,
    reducers: {
        toggleHeaderSidebarModal: (state, action: PayloadAction<HeaderSidebarSlice>) => {
            console.log({ action })
            state.show = action.payload.show
            state.page = action.payload.page
        },
        toggleProfileDropdown: (state, action: PayloadAction<boolean>) => {
            state.showProfileDropdown = action.payload
        },
        clearHeaderSidebarData: (state) => {
            state.show = false
        }
    },
});

export const { toggleHeaderSidebarModal, clearHeaderSidebarData, toggleProfileDropdown } = headerSidebarSlice.actions;
export type {
    HeaderSidebarSlice
};
export default headerSidebarSlice.reducer;
