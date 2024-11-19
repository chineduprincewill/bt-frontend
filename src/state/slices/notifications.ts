// notificationsCountSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotificationType } from '../../types/notifications';

interface NotificationsState {
    notifications: NotificationType[];
    count: number;
}

const initialState: NotificationsState = {
    notifications: [],
    count: 0,
};

export const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        setNotifications: (state, action: PayloadAction<NotificationType[]>) => {
            state.notifications = action.payload;
        },
        setNotificationsCount: (state, action) => {
            state.count = action.payload;
        },
    },
});

export const { setNotifications, setNotificationsCount } = notificationsSlice.actions;

export default notificationsSlice.reducer;
