import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface SettingsState {
    show: boolean
}

const initialState: SettingsState = {
    show: false,
};

export const settingsSlice = createSlice({
    name: "settings",
    initialState: initialState,
    reducers: {
        toggleSettingsModal: (state, action: PayloadAction<SettingsState>) => {
            state.show = action.payload.show
        }
    },
});

export const deactivateAccountSlice = createSlice({
    name: "deactivateAccount",
    initialState: initialState,
    reducers: {
        toggleDeactivateAccountModal: (state, action: PayloadAction<SettingsState>) => {
            state.show = action.payload.show
        }
    },
})

export const { toggleSettingsModal } = settingsSlice.actions;
export const { toggleDeactivateAccountModal } = deactivateAccountSlice.actions;
export type {
    SettingsState
};
export default settingsSlice.reducer;
