import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Typography, List, ListItem, ListItemText, Paper, Box, Alert } from '@mui/material';
import Metadata from '../components/Metadata';
import useOnlineStatus from '../hooks/useOnlineStatus';

function Balance() {
  const participants = useSelector((state) => state.transactions.participants);
  const transactions = useSelector((state) => state.transactions.transactions);
  const { exchangeRates, selectedCurrency, status, lastUpdated } = useSelector((state) => state.currency);
  const isOnline = useOnlineStatus();

  const participantMap = participants.reduce((acc, p) => {
    acc[p.id] = p.name;
    return acc;
  }, {});

  const calculateBalances = () => {
    const balances = {};
    participants.forEach((p) => {
      balances[p.id] = 0;
    });

    transactions.forEach((t) => {
      const rate = exchangeRates[t.currency] || 1;
      const amountInUSD = t.amount / rate;
      const splitAmountInUSD = amountInUSD / t.participants.length;
      t.participants.forEach((pId) => {
        if (pId !== t.paidBy) {
          balances[pId] -= splitAmountInUSD;
          balances[t.paidBy] += splitAmountInUSD;
        }
      });
    });

    // Prepare who needs to pay whom
    const debtors = [];
    const creditors = [];

    Object.keys(balances).forEach((pId) => {
      const balanceInSelectedCurrency = balances[pId] * (exchangeRates[selectedCurrency] || 1);
      if (balanceInSelectedCurrency < -0.01) {
        debtors.push({ id: pId, amount: -balanceInSelectedCurrency });
      } else if (balanceInSelectedCurrency > 0.01) {
        creditors.push({ id: pId, amount: balanceInSelectedCurrency });
      }
    });

    const settlements = [];

    debtors.forEach((debtor) => {
      let remaining = debtor.amount;
      creditors.forEach((creditor) => {
        if (remaining === 0) return;
        if (creditor.amount === 0) return;

        const settledAmount = Math.min(remaining, creditor.amount);
        settlements.push({
          from: participantMap[debtor.id],
          to: participantMap[creditor.id],
          amount: settledAmount.toFixed(2),
        });
        creditor.amount -= settledAmount;
        remaining -= settledAmount;
      });
    });

    return settlements;
  };

  // Only perform calculations if exchange rates are loaded
  if (status === 'loading') {
    return (
      <Container>
        <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
          Balance
        </Typography>
        <Typography variant="h6" align="center">
          Loading exchange rates...
        </Typography>
      </Container>
    );
  }

  if (status === 'failed' && isOnline) {
    return (
      <Container>
        <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
          Balance
        </Typography>
        <Alert severity="error">Failed to load exchange rates. Displaying amounts in USD.</Alert>
        <Paper elevation={3} sx={{ p: 2 }}>
          <List>
            {calculateBalances().map((s, index) => (
              <ListItem key={index}>
                <ListItemText primary={`${s.from} pays ${s.to}: ${selectedCurrency} ${s.amount}`} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Container>
    );
  }

  // When exchange rates are successfully loaded
  const settlements = calculateBalances();

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        Balance
      </Typography>

      {/* Metadata Section */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" color="textSecondary">
          Exchange Rates Last Updated: {lastUpdated || 'N/A'}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Exchange Rate Version: v1.0
        </Typography>
      </Box>
      <Metadata />

      {/* Offline Alert */}
      {!isOnline && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          You are currently offline. Some features may be unavailable.
        </Alert>
      )}

      <Paper elevation={3} sx={{ p: 2 }}>
        <List>
          {settlements.length === 0 && (
            <Typography variant="h6" align="center">
              All settled up!
            </Typography>
          )}
          {settlements.map((s, index) => (
            <ListItem key={index}>
              <ListItemText primary={`${s.from} pays ${s.to}: ${selectedCurrency} ${s.amount}`} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}

export default Balance;
