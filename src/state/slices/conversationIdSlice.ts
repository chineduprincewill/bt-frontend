import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ConversationState {
    conversationId: number | null;
}

const initialState: ConversationState = {
    conversationId: null,
};

export const conversationIdSlice = createSlice({
    name: 'conversation',
    initialState,
    reducers: {
        setConversationId: (state, action: PayloadAction<number | null>) => {
            state.conversationId = action.payload;
        },
        resetConversationId: (state) => {
            state.conversationId = null;
        },
    },
});

export const { setConversationId, resetConversationId } = conversationIdSlice.actions;

export default conversationIdSlice.reducer;
