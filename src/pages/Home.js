import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import ExchangeRates from '../components/ExchangeRates';

function Home() {
  return (
    <Container>
      <Box sx={{ mt: { xs: 2, sm: 4 }, textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom>
          Welcome to Pay As We Go
        </Typography>
        <Typography variant="h6">
          Manage and split your bills effortlessly with our intuitive platform.
        </Typography>
      </Box>
      <ExchangeRates />
    </Container>
  );
}

export default Home;
