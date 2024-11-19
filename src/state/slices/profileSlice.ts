import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ProfileState {
    show: boolean,
    stageToStartFrom: UpdateProfileFlowStages,
    modalType: 'create' | 'update',
    showProfilePicUploadFlow?: boolean
}

const initialState: ProfileState = {
    show: false,
    stageToStartFrom: 'profile-creation',
    showProfilePicUploadFlow: false,
    modalType: 'update'
};

export type UpdateProfileFlowStages = 'profile-creation' | 'education' | 'experience' | 'skillset'

export const profileSlice = createSlice({
    name: "profile",
    initialState: initialState,
    reducers: {
        toggleProfileFormModal: (state, action: PayloadAction<{ show: boolean, modalType?: ProfileState['modalType'], stageToStartFrom?: UpdateProfileFlowStages, showProfilePicUploadFlow?: boolean }>) => {
            state.show = action.payload.show
            state.stageToStartFrom = action.payload.stageToStartFrom ?? 'profile-creation'
            state.modalType = action.payload.modalType ?? 'update'
            state.showProfilePicUploadFlow = action.payload.showProfilePicUploadFlow ?? false
        },
    },
});

export const { toggleProfileFormModal } = profileSlice.actions;
export type {
    ProfileState
};
export default profileSlice.reducer;
