import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTransaction } from '../redux/slices/transactionsSlice';
import {
  Container,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
} from '@mui/material';

function Transactions() {
  const participants = useSelector((state) => state.transactions.participants);
  const transactions = useSelector((state) => state.transactions.transactions);
  const dispatch = useDispatch();
  
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState('');
  const [participantsInvolved, setParticipantsInvolved] = useState([]);

  const handleAddTransaction = () => {
    if (description && amount && paidBy && participantsInvolved.length > 0) {
      dispatch(addTransaction({
        id: Date.now(),
        description,
        amount: parseFloat(amount),
        paidBy,
        participants: participantsInvolved,
        date: new Date().toISOString(),
      }));
      // Reset fields
      setDescription('');
      setAmount('');
      setPaidBy('');
      setParticipantsInvolved([]);
    }
  };

  const handleParticipantSelect = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setParticipantsInvolved([...participantsInvolved, value]);
    } else {
      setParticipantsInvolved(participantsInvolved.filter((p) => p !== value));
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        Transactions
      </Typography>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Description"
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Amount"
              variant="outlined"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              select
              SelectProps={{ native: true }}
              fullWidth
              label="Paid By"
              variant="outlined"
              value={paidBy}
              onChange={(e) => setPaidBy(e.target.value)}
            >
              <option value="">Select</option>
              {participants.map((p) => (
                <option key={p.id} value={p.name}>
                  {p.name}
                </option>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Participants Involved</Typography>
            <FormGroup row>
              {participants.map((p) => (
                <FormControlLabel
                  key={p.id}
                  control={
                    <Checkbox
                      checked={participantsInvolved.includes(p.name)}
                      onChange={handleParticipantSelect}
                      value={p.name}
                    />
                  }
                  label={p.name}
                />
              ))}
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleAddTransaction}>
              Add Transaction
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <List>
        {transactions.map((t) => (
          <ListItem key={t.id} divider>
            <ListItemText
              primary={`${t.description} - $${t.amount.toFixed(2)}`}
              secondary={
                <>
                  <Typography component="span" variant="body2" color="textPrimary">
                    Paid by: {t.paidBy}
                  </Typography>
                  <br />
                  <Typography component="span" variant="body2" color="textPrimary">
                    Participants: {t.participants.join(', ')}
                  </Typography>
                  <br />
                  <Typography component="span" variant="body2" color="textSecondary">
                    Date: {new Date(t.date).toLocaleString()}
                  </Typography>
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default Transactions;
