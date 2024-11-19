import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { EventsResponseFromApi } from "../../api/postApi";

interface FeedSlice {
    section: 'feeds' | 'messages' | 'events' | 'more',
    events?: EventsResponseFromApi[]
}

const initialState: FeedSlice = {
    section: 'feeds',
    events: []
};

export const feedSlice = createSlice({
    name: "feeds",
    initialState: initialState,
    reducers: {
        setFeedSection: (state, action: PayloadAction<FeedSlice>) => {
            state.section = action.payload.section
        },
        setEventsData: (state, action: PayloadAction<{ events: EventsResponseFromApi[] }>) => {
            state.events = action.payload.events
        }
    },
});

export const { setFeedSection, setEventsData } = feedSlice.actions;
export type {
    FeedSlice
};
export default feedSlice.reducer;
