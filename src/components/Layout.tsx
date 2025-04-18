import { Box } from '@chakra-ui/react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box
      as="main"
      minH="100vh"
      w="100%"
      pt={{ base: "90px", md: "20px" }}
      pl={{ base: "10px", md: "260px" }}
      pr={{ base: "10px", md: "20px" }}
      pb={{ base: "20px", md: "20px" }}
      position="relative"
      overflowX="hidden"
      overflowY="auto"
      css={{
        '-webkit-overflow-scrolling': 'touch',
        scrollBehavior: 'smooth',
        '&::-webkit-scrollbar': {
          width: '4px',
        },
        '&::-webkit-scrollbar-track': {
          width: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'gray.500',
          borderRadius: '24px',
        },
      }}
    >
      {children}
    </Box>
  );
};

export default Layout;