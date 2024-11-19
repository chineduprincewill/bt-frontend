import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AboutState {
    paneToShow: 'about' | 'user-type' | 'contact'
}

const initialState: AboutState = {
    paneToShow: 'about'
};

export const aboutSlice = createSlice({
    name: "about",
    initialState: initialState,
    reducers: {
        selectPaneInAboutUsPage: (state, action: PayloadAction<AboutState>) => {
            state.paneToShow = action.payload.paneToShow
        },
        clearAboutData: (state) => {
            state.paneToShow = 'about'
        }
    },
});

export const { selectPaneInAboutUsPage, clearAboutData } = aboutSlice.actions;
export type {
    AboutState
};
export default aboutSlice.reducer;
