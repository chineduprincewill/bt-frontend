import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TimeSelectionState {
    selectedTime: string | null;
}

const initialState: TimeSelectionState = {
    selectedTime: null,
};

const timeSelectionSlice = createSlice({
    name: 'timeSelection',
    initialState,
    reducers: {
        setSelectedTime: (state, action: PayloadAction<string>) => {
            state.selectedTime = action.payload;
        },
    },
});

export const { setSelectedTime } = timeSelectionSlice.actions;
export default timeSelectionSlice.reducer;
