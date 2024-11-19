import { createSlice } from '@reduxjs/toolkit';

export const mainSidebarSlice = createSlice({
    name: 'mainSidebar',
    initialState: {
        isVisible: true,
        isMobileVisible: false,
    },
    reducers: {
        toggleMainSidebar: (state) => {
            state.isVisible = !state.isVisible;
        },
        toggleMobileSidebar: (state) => {
            state.isMobileVisible = !state.isMobileVisible;
        },
        setVisibility: (state, action) => {
            state.isVisible = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { toggleMainSidebar, toggleMobileSidebar, setVisibility } = mainSidebarSlice.actions;

export default mainSidebarSlice.reducer;
