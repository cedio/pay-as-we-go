import { configureStore } from '@reduxjs/toolkit';
import transactionsReducer from './slices/transactionsSlice';
import { loadState, saveState } from './localStorage';

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState({
    transactions: store.getState().transactions,
  });
});

export default store;
