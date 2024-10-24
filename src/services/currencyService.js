const API_URL = 'https://open.er-api.com/v6/latest/USD';

const currencyService = {
  getExchangeRates: async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch exchange rates');
      }
      const data = await response.json();
      // Save to localStorage for offline access
      localStorage.setItem('exchangeRates', JSON.stringify({ rates: data.rates, timestamp: Date.now() }));
      return data;
    } catch (error) {
      // Fallback to cached rates
      const cachedRates = localStorage.getItem('exchangeRates');
      if (cachedRates) {
        return JSON.parse(cachedRates);
      } else {
        throw error;
      }
    }
  },
};

export default currencyService;
