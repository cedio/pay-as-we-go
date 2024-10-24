import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import currencyService from '../../services/currencyService';

// Async thunk to fetch exchange rates
export const fetchExchangeRates = createAsyncThunk(
  'currency/fetchExchangeRates',
  async () => {
    const response = await currencyService.getExchangeRates();
    return response;
  }
);

const currencySlice = createSlice({
  name: 'currency',
  initialState: {
    availableCurrencies: ['USD', 'EUR', 'GBP', 'JPY', 'HKD', 'CNY', 'TWD'],
    selectedCurrency: 'USD',
    exchangeRates: { USD: 1 },
    lastUpdated: null, // Add lastUpdated field
    status: 'idle',
    error: null,
  },
  reducers: {
    setSelectedCurrency(state, action) {
      state.selectedCurrency = action.payload;
    },
    setExchangeRates(state, action) {
      state.exchangeRates = { USD: 1, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExchangeRates.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchExchangeRates.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.exchangeRates = { USD: 1, ...action.payload.rates };
        state.lastUpdated = new Date().toLocaleString(); // Set lastUpdated
      })
      .addCase(fetchExchangeRates.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setSelectedCurrency, setExchangeRates } = currencySlice.actions;

export default currencySlice.reducer;
