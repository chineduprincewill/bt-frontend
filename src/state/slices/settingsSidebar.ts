import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isSettingsMenuVisible: true,
};

const settingsSidebarSlice = createSlice({
    name: 'settingsSidebar',
    initialState,
    reducers: {
        toggleSettingsMenuVisibility: (state) => {
            state.isSettingsMenuVisible = !state.isSettingsMenuVisible;
        },
        setSettingsMenuVisibility: (state, action) => {
            state.isSettingsMenuVisible = action.payload;
        },
    },
});

export const { toggleSettingsMenuVisibility, setSettingsMenuVisibility } = settingsSidebarSlice.actions;
export default settingsSidebarSlice.reducer;
