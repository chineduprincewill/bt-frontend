// src/state/slices/messageEventsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MessagingEvent {
    type: string;
    payload: string; // Adjust this to match your actual event structure
}

const initialState = {
    lastEvent: null as MessagingEvent | null,
};

export const messageEventsSlice = createSlice({
    name: 'messageEvents',
    initialState,
    reducers: {
        eventReceived: (state, action: PayloadAction<MessagingEvent>) => {
            state.lastEvent = action.payload;
        },
    },
});

export const { eventReceived } = messageEventsSlice.actions;

export default messageEventsSlice.reducer;
