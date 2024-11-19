// notificationsCountSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DateState {
    date: null | Date;
}

const initialState: DateState = {
    date: null,
};

export const dateSlice = createSlice({
    name: 'date',
    initialState,
    reducers: {
        setDate: (state, action: PayloadAction<Date>) => {
            state.date = action.payload;
        },
    },
});

export const { setDate } = dateSlice.actions;

export default dateSlice.reducer;
