import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';

// Pages
import Dashboard from './pages/Dashboard';
import TicketMarketplace from './pages/TicketMarketplace';
import MyTickets from './pages/MyTickets';
import WalletConnect from './pages/WalletConnect';
import WalletAddress from './pages/WalletAddress';

const AppRoutes: React.FC = () => {
  return (
    <Box minH="100vh" pb="80px" ml="240px">
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/marketplace" element={<TicketMarketplace />} />
          <Route path="/my-tickets" element={<MyTickets />} />
          <Route path="/connect" element={<WalletConnect />} />
          <Route path="/wallet/:walletId" element={<WalletAddress />} />
        </Routes>
      </AnimatePresence>
    </Box>
  );
};

export default AppRoutes; 