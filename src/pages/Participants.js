import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addParticipant } from '../redux/slices/transactionsSlice';
import {
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  Alert,
} from '@mui/material';
import Slide from '@mui/material/Slide';

// Optional: Slide Transition for Snackbar
function SlideTransition(props) {
  return <Slide {...props} direction="down" />;
}

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
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Positioning at top-center
        TransitionComponent={SlideTransition} // Adding slide transition
      >
        <Alert
          onClose={() => setOpen(false)}
          severity="success"
          sx={{ width: '100%', fontSize: '1.2rem', fontWeight: 'bold' }} // Enhanced styling
          variant="filled" // Filled variant for higher visibility
        >
          Participant added successfully!
        </Alert>
      </Snackbar>
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
    </Container>
  );
}

export default Participants;
