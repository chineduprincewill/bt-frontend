import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface NotificationPaneState {
    show: boolean
}
export const notificationSlice = createSlice({
    name: "notification",
    initialState: {
        show: false
    },
    reducers: {
        setNotificationModal: (state, action: PayloadAction<{ show: boolean }>) => {
            state.show = action.payload.show
        }
    },
});

export const { setNotificationModal } = notificationSlice.actions;
export type {
    NotificationPaneState
};
export default notificationSlice.reducer;
