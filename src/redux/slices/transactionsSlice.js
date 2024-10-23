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
    editParticipant(state, action) {
      const { id, updatedParticipant } = action.payload;
      const participantIndex = state.participants.findIndex((p) => p.id === id);
      if (participantIndex !== -1) {
        const oldName = state.participants[participantIndex].name;
        state.participants[participantIndex] = { ...state.participants[participantIndex], ...updatedParticipant };

        // Update participant name in transactions
        state.transactions = state.transactions.map((transaction) => {
          const updatedPaidBy = transaction.paidBy === oldName ? updatedParticipant.name : transaction.paidBy;

          const updatedParticipants = transaction.participants.map((participantName) =>
            participantName === oldName ? updatedParticipant.name : participantName
          );

          return {
            ...transaction,
            paidBy: updatedPaidBy,
            participants: updatedParticipants,
          };
        });
      }
    },
    deleteParticipant(state, action) {
      const participantId = action.payload;
      const participant = state.participants.find((p) => p.id === participantId);
      if (participant) {
        state.participants = state.participants.filter((p) => p.id !== participantId);

        // Remove participant from transactions
        state.transactions = state.transactions.map((transaction) => {
          const updatedParticipants = transaction.participants.filter((name) => name !== participant.name);
          return {
            ...transaction,
            participants: updatedParticipants,
          };
        });

        // Remove transactions where the participant was the payer or no participants are left
        state.transactions = state.transactions.filter(
          (transaction) =>
            transaction.paidBy !== participant.name && transaction.participants.length > 0
        );
      }
    },
    addTransaction(state, action) {
      state.transactions.push(action.payload);
    },
    editTransaction(state, action) {
      const { id, updatedTransaction } = action.payload;
      const index = state.transactions.findIndex((t) => t.id === id);
      if (index !== -1) {
        state.transactions[index] = { ...state.transactions[index], ...updatedTransaction };
      }
    },
    deleteTransaction(state, action) {
      state.transactions = state.transactions.filter((t) => t.id !== action.payload);
    },
  },
});

export const {
  addParticipant,
  editParticipant,
  deleteParticipant,
  addTransaction,
  editTransaction,
  deleteTransaction,
} = transactionsSlice.actions;

export default transactionsSlice.reducer;
