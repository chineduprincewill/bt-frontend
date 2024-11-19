import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { connectionApiSlice } from '../../api/connectionApi';
import { EventsResponseFromApi } from '../../api/postApi';

interface Connections {
    followerCount: number;
    followingCount: number;
}

const initialState: Connections = {
    followerCount: 0,
    followingCount: 0,
};

export const connectionSlice = createSlice({
    name: 'connections',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(connectionApiSlice.endpoints.getConnections.matchFulfilled, (state, action) => {
            if (action.meta.arg.originalArgs.type === 'followers' && !action.meta.arg.originalArgs.username) {
                state.followerCount = action.payload.data.length;
            }
            return state;
        });
    },
});

export default connectionSlice.reducer;
