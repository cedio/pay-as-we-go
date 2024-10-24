import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Transactions from './pages/Transactions';
import Participants from './pages/Participants';
import Balance from './pages/Balance';
import Navbar from './components/Navbar';
import { useDispatch } from 'react-redux';
import { fetchExchangeRates } from './redux/slices/currencySlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchExchangeRates());
  }, [dispatch]);

  return (
    <Router hashType="noslash">
      <Navbar />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="participants" element={<Participants />} />
        <Route path="balance" element={<Balance />} />
      </Routes>
    </Router>
  );
}

export default App;
