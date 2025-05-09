import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';

// Pages
import Dashboard from './pages/Dashboard';
import TicketMarketplace from './pages/TicketMarketplace';
import MyTickets from './pages/MyTickets';
import WalletConnect from './pages/WalletConnect';
import WalletAddress from './pages/WalletAddress';
import Settings from './pages/Settings';

const AppRoutes: React.FC = () => {
  const location = useLocation();
  
  return (
    <Box 
      minH="100vh"
      pb={{ base: "100px", md: "80px" }}
      ml={{ base: "0", md: "240px" }}
      w={{ base: "100%", md: "calc(100% - 240px)" }}
      px={{ base: "4", md: "8" }}
      pt={{ base: "20", md: "8" }}
      position="relative"
      overflow="auto"
      display="flex"
      flexDirection="column"
      alignItems="stretch"
      maxW={{ base: "100%", md: "1600px" }}
      mx="auto"
    >
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/marketplace" element={<TicketMarketplace />} />
          <Route path="/my-tickets" element={<MyTickets />} />
          <Route path="/walletconnect" element={<WalletConnect />} />
          <Route path="/wallet/:walletId" element={<WalletAddress />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </AnimatePresence>
    </Box>
  );
};

export default AppRoutes;