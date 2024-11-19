import { createSlice } from '@reduxjs/toolkit';
interface ModalsState {
    showPublishModal: boolean;
    showCreateCommunityModal: boolean;
    showInviteMembersModal: boolean;
    showRequestJoinPlatformModal: boolean;
    showLeaveCommunityModal: boolean;
    showLeaveVillageModal: boolean;
}

const initialState: ModalsState = {
    showPublishModal: false,
    showCreateCommunityModal: false,
    showInviteMembersModal: false,
    showRequestJoinPlatformModal: false,
    showLeaveCommunityModal: false,
    showLeaveVillageModal: false,
};

export const modalsSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: {
        togglePublishModal: (state) => {
            state.showPublishModal = !state.showPublishModal;
        },
        togglePublishCommunityModal: (state) => {
            state.showCreateCommunityModal = !state.showCreateCommunityModal;
        },
        toggleShowInviteMembersModal: (state) => {
            state.showInviteMembersModal = !state.showInviteMembersModal;
        },
        setShowInviteMembersModal: (state, action) => {
            state.showInviteMembersModal = action.payload;
        },
        toggleJoinRequestModal: (state) => {
            state.showRequestJoinPlatformModal = !state.showRequestJoinPlatformModal;
        },
        toggleLeaveVillageModal: (state) => {
            state.showLeaveVillageModal = !state.showLeaveVillageModal;
        },
        toggleLeaveCommunityModal: (state) => {
            state.showLeaveCommunityModal = !state.showLeaveCommunityModal;
        },
    },
});

export const {
    togglePublishModal,
    togglePublishCommunityModal,
    toggleShowInviteMembersModal,
    toggleJoinRequestModal,
    toggleLeaveCommunityModal,
    toggleLeaveVillageModal,
    setShowInviteMembersModal,
} = modalsSlice.actions;
export type { ModalsState };
export default modalsSlice.reducer;
