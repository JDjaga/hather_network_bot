import React from 'react';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import theme from './theme';
import AppRoutes from './AppRoutes';
import Navigation from './components/Navigation';

const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Router>
        <Navigation />
        <AppRoutes />
      </Router>
    </ChakraProvider>
  );
};

export default App; 