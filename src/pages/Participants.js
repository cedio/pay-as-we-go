import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addParticipant } from '../redux/slices/transactionsSlice';
import { Container, Typography, TextField, Button, List, ListItem, ListItemText, Grid, Paper } from '@mui/material';
import { Snackbar, Alert } from '@mui/material';

function Participants() {
  const participants = useSelector((state) => state.transactions.participants);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);

  const handleAdd = () => {
    if (name.trim()) {
      dispatch(addParticipant({ id: Date.now(), name }));
      setName('');
      setOpen(true);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        Participants
      </Typography>
      <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              label="Enter participant name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button variant="contained" color="primary" fullWidth onClick={handleAdd}>
              Add
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <List>
        {participants.map((p) => (
          <ListItem key={p.id} divider>
            <ListItemText primary={p.name} />
          </ListItem>
        ))}
      </List>
      <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: '100%' }}>
          Participant added successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Participants;
