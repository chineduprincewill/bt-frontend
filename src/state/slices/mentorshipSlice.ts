import { createSlice } from '@reduxjs/toolkit';
import { MentorshipData } from '../../types/mentorship';
interface MentorshipState {
    mentorship: MentorshipData;
}
export const mentorshipSlice = createSlice({
    name: 'mentorship',
    initialState: {
        mentorship: null,
    },
    reducers: {
        setCurrentMentorship: (state, action) => {
            state.mentorship = action.payload;
        },
    },
});

export const { setCurrentMentorship } = mentorshipSlice.actions;
export type { MentorshipState };
export default mentorshipSlice.reducer;
