import { createSlice } from '@reduxjs/toolkit';

interface PlatformState {
    id: string;
}

const initialState: PlatformState = {
    id: '',
};

export const platformSlice = createSlice({
    name: 'platform',
    initialState: initialState,
    reducers: {
        setPlatformId: (state, action) => {
            state.id = action.payload.id;
        },
    },
});

export const { setPlatformId } = platformSlice.actions;

export default platformSlice.reducer;
