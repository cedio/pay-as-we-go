import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTransaction, editTransaction, deleteTransaction } from '../redux/slices/transactionsSlice';
import {
  Container,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Grid,
  List,
  ListItem,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

function Transactions() {
  const participants = useSelector((state) => state.transactions.participants);
  const transactions = useSelector((state) => state.transactions.transactions);
  const dispatch = useDispatch();

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState('');
  const [participantsInvolved, setParticipantsInvolved] = useState([]);

  // State for editing
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState(null);
  const [editDescription, setEditDescription] = useState('');
  const [editAmount, setEditAmount] = useState('');
  const [editPaidBy, setEditPaidBy] = useState('');
  const [editParticipantsInvolved, setEditParticipantsInvolved] = useState([]);

  const handleAddTransaction = () => {
    if (description && amount && paidBy && participantsInvolved.length > 0) {
      dispatch(
        addTransaction({
          id: Date.now(),
          description,
          amount: parseFloat(amount),
          paidBy,
          participants: participantsInvolved,
          date: new Date().toISOString(),
        })
      );
      // Reset fields
      setDescription('');
      setAmount('');
      setPaidBy('');
      setParticipantsInvolved([]);
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteTransaction(id));
  };

  const handleEditOpen = (transaction) => {
    setCurrentTransaction(transaction);
    setEditDescription(transaction.description);
    setEditAmount(transaction.amount.toString());
    setEditPaidBy(transaction.paidBy);
    setEditParticipantsInvolved(transaction.participants);
    setEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setEditDialogOpen(false);
    setCurrentTransaction(null);
  };

  const handleEditSave = () => {
    if (editDescription && editAmount && editPaidBy && editParticipantsInvolved.length > 0) {
      dispatch(
        editTransaction({
          id: currentTransaction.id,
          updatedTransaction: {
            description: editDescription,
            amount: parseFloat(editAmount),
            paidBy: editPaidBy,
            participants: editParticipantsInvolved,
          },
        })
      );
      handleEditClose();
    }
  };

  const getParticipantName = (id) => {
    const participant = participants.find((p) => p.id === id);
    return participant ? participant.name : 'Unknown';
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
            <FormControl fullWidth variant="outlined">
              <InputLabel>Paid By</InputLabel>
              <Select
                label="Paid By"
                value={paidBy}
                onChange={(e) => setPaidBy(e.target.value)}
              >
                <MenuItem value="">
                  <em>Select</em>
                </MenuItem>
                {participants.map((p) => (
                  <MenuItem key={p.id} value={p.id}>
                    {p.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Participants Involved</InputLabel>
              <Select
                label="Participants Involved"
                multiple
                value={participantsInvolved}
                onChange={(e) => setParticipantsInvolved(e.target.value)}
                renderValue={(selected) => selected.map(getParticipantName).join(', ')}
              >
                {participants.map((p) => (
                  <MenuItem key={p.id} value={p.id}>
                    <Checkbox checked={participantsInvolved.indexOf(p.id) > -1} />
                    <ListItemText primary={p.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
          <ListItem
            key={t.id}
            divider
            secondaryAction={
              <>
                <IconButton edge="end" aria-label="edit" onClick={() => handleEditOpen(t)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(t.id)}>
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <ListItemText
              primary={`${t.description} - $${t.amount.toFixed(2)}`}
              secondary={
                <>
                  <Typography component="span" variant="body2" color="textPrimary">
                    Paid by: {getParticipantName(t.paidBy)}
                  </Typography>
                  <br />
                  <Typography component="span" variant="body2" color="textPrimary">
                    Participants: {t.participants.map(getParticipantName).join(', ')}
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

      {/* Edit Transaction Dialog */}
      <Dialog open={editDialogOpen} onClose={handleEditClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Transaction</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Amount"
                variant="outlined"
                type="number"
                value={editAmount}
                onChange={(e) => setEditAmount(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Paid By</InputLabel>
                <Select
                  label="Paid By"
                  value={editPaidBy}
                  onChange={(e) => setEditPaidBy(e.target.value)}
                >
                  <MenuItem value="">
                    <em>Select</em>
                  </MenuItem>
                  {participants.map((p) => (
                    <MenuItem key={p.id} value={p.id}>
                      {p.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Participants Involved</InputLabel>
                <Select
                  label="Participants Involved"
                  multiple
                  value={editParticipantsInvolved}
                  onChange={(e) => setEditParticipantsInvolved(e.target.value)}
                  renderValue={(selected) => selected.map(getParticipantName).join(', ')}
                >
                  {participants.map((p) => (
                    <MenuItem key={p.id} value={p.id}>
                      <Checkbox checked={editParticipantsInvolved.indexOf(p.id) > -1} />
                      <ListItemText primary={p.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleEditSave} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Transactions;
