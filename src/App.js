import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Transactions from './pages/Transactions';
import Participants from './pages/Participants';
import Balance from './pages/Balance';
import Navbar from './components/Navbar';
import { useDispatch } from 'react-redux';
import { fetchExchangeRates } from './redux/slices/currencySlice';
import { Snackbar, Button } from '@mui/material';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

function App() {
  const dispatch = useDispatch();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [waitingServiceWorker, setWaitingServiceWorker] = useState(null);

  useEffect(() => {
    dispatch(fetchExchangeRates());
  }, [dispatch]);

  useEffect(() => {
    serviceWorkerRegistration.register({
      onUpdate: (registration) => {
        setWaitingServiceWorker(registration.waiting);
        setOpenSnackbar(true);
      },
      onSuccess: () => {
        console.log('Service Worker registered successfully.');
      },
    });
  }, []);

  const handleUpdate = () => {
    if (waitingServiceWorker) {
      waitingServiceWorker.postMessage({ type: 'SKIP_WAITING' });
      setOpenSnackbar(false);
      window.location.reload();
    }
  };

  return (
    <Router hashType="noslash">
      <Navbar />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="participants" element={<Participants />} />
        <Route path="balance" element={<Balance />} />
      </Routes>
      <Snackbar
        open={openSnackbar}
        message="A new version is available."
        action={
          <Button color="secondary" size="small" onClick={handleUpdate}>
            Update
          </Button>
        }
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Router>
  );
}

export default App;
