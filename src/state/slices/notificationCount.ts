// notificationsCountSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NotificationsCountState {
    unreadCount: number;
}

const initialState: NotificationsCountState = {
    unreadCount: 0, // Initialize unread notifications count to 0
};

export const notificationsCountSlice = createSlice({
    name: 'notificationsCount',
    initialState,
    reducers: {
        // Action to set the unread notifications count
        setUnreadNotificationsCount: (state, action: PayloadAction<number>) => {
            state.unreadCount = action.payload;
        },
        // Optional: Action to increment the unread count (useful for real-time updates)
        incrementUnreadNotificationsCount: (state) => {
            state.unreadCount += 1;
        },
        // Optional: Action to decrement the unread count
        decrementUnreadNotificationsCount: (state) => {
            state.unreadCount = Math.max(0, state.unreadCount - 1);
        },
        // Optional: Reset the unread count to zero
        resetUnreadNotificationsCount: (state) => {
            state.unreadCount = 0;
        },
    },
});

// Export the actions
export const { setUnreadNotificationsCount, incrementUnreadNotificationsCount, decrementUnreadNotificationsCount, resetUnreadNotificationsCount } =
    notificationsCountSlice.actions;

// Export the reducer
export default notificationsCountSlice.reducer;
