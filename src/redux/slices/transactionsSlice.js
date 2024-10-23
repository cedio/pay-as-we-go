import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  transactions: [],
  participants: [],
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addParticipant(state, action) {
      state.participants.push(action.payload);
    },
    addTransaction(state, action) {
      state.transactions.push(action.payload);
    },
    // Additional reducers for editing and deleting
  },
});

export const { addParticipant, addTransaction } = transactionsSlice.actions;
export default transactionsSlice.reducer;