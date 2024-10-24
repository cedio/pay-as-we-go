import { configureStore } from '@reduxjs/toolkit';
import transactionsReducer from './slices/transactionsSlice';
import currencyReducer from './slices/currencySlice'; // Import the currency slice
import { loadState, saveState } from './localStorage';

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    currency: currencyReducer, // Add it to the reducers
  },
  preloadedState,
});

store.subscribe(() => {
  saveState({
    transactions: store.getState().transactions,
    currency: {
      ...store.getState().currency,
      // Optionally, you can control what to save, e.g., exclude UI-related states
    },
  });
});

export default store;
