import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Typography, List, ListItem, ListItemText, Paper } from '@mui/material';

function Balance() {
  const participants = useSelector((state) => state.transactions.participants);
  const transactions = useSelector((state) => state.transactions.transactions);

  const calculateBalances = () => {
    const balances = {};
    participants.forEach((p) => {
      balances[p.name] = 0;
    });

    transactions.forEach((t) => {
      const splitAmount = t.amount / t.participants.length;
      t.participants.forEach((p) => {
        if (p !== t.paidBy) {
          balances[p] -= splitAmount;
          balances[t.paidBy] += splitAmount;
        }
      });
    });

    // Prepare who needs to pay whom
    const debtors = [];
    const creditors = [];

    Object.keys(balances).forEach((person) => {
      if (balances[person] < 0) {
        debtors.push({ name: person, amount: -balances[person] });
      } else if (balances[person] > 0) {
        creditors.push({ name: person, amount: balances[person] });
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
          from: debtor.name,
          to: creditor.name,
          amount: settledAmount.toFixed(2),
        });
        creditor.amount -= settledAmount;
        remaining -= settledAmount;
      });
    });

    return settlements;
  };

  const settlements = calculateBalances();

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        Balance
      </Typography>
      <Paper elevation={3} sx={{ p: 2 }}>
        <List>
          {settlements.length === 0 && (
            <Typography variant="h6" align="center">
              All settled up!
            </Typography>
          )}
          {settlements.map((s, index) => (
            <ListItem key={index}>
              <ListItemText primary={`${s.from} pays ${s.to}: $${s.amount}`} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}

export default Balance;
