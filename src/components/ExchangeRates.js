import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Box, Grid, Paper, Avatar, Button } from '@mui/material';
import { setSelectedCurrency, fetchExchangeRates } from '../redux/slices/currencySlice';
import { FlagIcon } from 'react-flag-kit';
import currencyToCountry from '../utils/currencyToCountry';
import useOnlineStatus from '../hooks/useOnlineStatus';

function ExchangeRates() {
  const dispatch = useDispatch();
  const { exchangeRates, availableCurrencies, selectedCurrency, lastUpdated } = useSelector((state) => state.currency);
  const isOnline = useOnlineStatus();

  const handleRefresh = () => {
    if (isOnline) {
      dispatch(fetchExchangeRates());
    } else {
      alert('Cannot refresh exchange rates while offline.');
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5">Current Exchange Rates</Typography>
        <Button variant="contained" onClick={handleRefresh} disabled={!isOnline}>
          Refresh Rates
        </Button>
      </Box>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
        Last Updated: {lastUpdated || 'N/A'}
      </Typography>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Grid container spacing={2}>
          {availableCurrencies.map((currency) => {
            const countryCode = currencyToCountry[currency];
            if (!countryCode) {
              console.warn(`No country code found for currency: ${currency}`);
            } else {
              console.log(`Currency: ${currency}, Country Code: ${countryCode}`);
            }
            return (
              <Grid item xs={12} sm={6} md={4} key={currency}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {countryCode ? (
                    <Avatar sx={{ mr: 2, bgcolor: 'transparent' }}>
                      <FlagIcon code={countryCode} size={24} />
                    </Avatar>
                  ) : (
                    <Avatar sx={{ mr: 2, bgcolor: 'transparent' }}>
                      {/* Optionally, use a default icon or omit the avatar */}
                      <span>🏳️</span>
                    </Avatar>
                  )}
                  <Typography variant="body1" sx={{ flexGrow: 1 }}>
                    {currency}: {exchangeRates[currency]}
                  </Typography>
                  {selectedCurrency !== currency && (
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => dispatch(setSelectedCurrency(currency))}
                    >
                      Select
                    </Button>
                  )}
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Paper>
    </Box>
  );
}

export default ExchangeRates;
