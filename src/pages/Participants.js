import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addParticipant, editParticipant, deleteParticipant } from '../redux/slices/transactionsSlice';
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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';

function Participants() {
  const participants = useSelector((state) => state.transactions.participants);
  const dispatch = useDispatch();

  const [name, setName] = useState('');

  // State for editing
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentParticipant, setCurrentParticipant] = useState(null);
  const [editName, setEditName] = useState('');

  const handleAdd = () => {
    if (name.trim() !== '') {
      dispatch(addParticipant({ id: uuidv4(), name: name.trim() }));
      setName('');
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteParticipant(id));
  };

  const handleEditOpen = (participant) => {
    setCurrentParticipant(participant);
    setEditName(participant.name);
    setEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setEditDialogOpen(false);
    setCurrentParticipant(null);
    setEditName('');
  };

  const handleEditSave = () => {
    if (editName.trim() !== '') {
      dispatch(
        editParticipant({
          id: currentParticipant.id,
          updatedParticipant: { name: editName.trim() },
        })
      );
      handleEditClose();
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        Participants
      </Typography>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              label="Participant Name"
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
            <IconButton edge="end" aria-label="edit" onClick={() => handleEditOpen(p)}>
              <EditIcon />
            </IconButton>
            <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(p.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>

      {/* Edit Participant Dialog */}
      <Dialog open={editDialogOpen} onClose={handleEditClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Participant</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Participant Name"
            variant="outlined"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            sx={{ mt: 2 }}
          />
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

export default Participants;
