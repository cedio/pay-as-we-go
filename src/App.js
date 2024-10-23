import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Transactions from './pages/Transactions';
import Participants from './pages/Participants';
import Balance from './pages/Balance';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router basename="/pay-as-we-go">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/participants" element={<Participants />} />
        <Route path="/balance" element={<Balance />} />
      </Routes>
    </Router>
  );
}

export default App;
