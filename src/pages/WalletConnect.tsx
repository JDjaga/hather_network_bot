import React from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  useColorModeValue,
  Grid,
  Icon,
  HStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaWallet, FaEthereum, FaBtc } from 'react-icons/fa';
import { SiBinance, SiPolygon } from 'react-icons/si';
import GlowBox from '../components/shared/GlowBox';
import { useNavigate } from 'react-router-dom';

const MotionBox = motion(Box);

interface WalletOptionProps {
  id: string;
  name: string;
  icon: any;
  color: string;
}

const walletOptions: WalletOptionProps[] = [
  {
    id: 'metamask',
    name: 'MetaMask',
    icon: FaEthereum,
    color: 'orange.500',
  },
  {
    id: 'binance',
    name: 'Binance Wallet',
    icon: SiBinance,
    color: 'yellow.500',
  },
  {
    id: 'polygon',
    name: 'Polygon Wallet',
    icon: SiPolygon,
    color: 'purple.500',
  },
  {
    id: 'hathor',
    name: 'Hathor Wallet',
    icon: FaBtc,
    color: 'blue.500',
  },
];

const WalletOption = ({ option }: { option: WalletOptionProps }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/wallet/${option.id}`);
  };

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onClick={handleClick}
      cursor="pointer"
    >
      <GlowBox
        p={6}
        bg={bgColor}
        borderRadius="xl"
        boxShadow="lg"
        glowColor={option.color}
        glowIntensity={0.8}
        whileHover={{
          scale: 1.05,
          boxShadow: `0 0 30px var(--chakra-colors-${option.color.replace('.', '-')}), 0 0 50px rgba(49, 130, 206, 0.3)`,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 10
          }
        }}
      >
        <HStack spacing={4} w="100%" justify="center">
          <Icon as={option.icon} w={8} h={8} color={option.color} />
          <Text fontSize="lg" fontWeight="bold">
            {option.name}
          </Text>
        </HStack>
      </GlowBox>
    </MotionBox>
  );
};

const WalletConnect = () => {
  return (
    <Box p={8}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Icon as={FaWallet} w={12} h={12} color="brand.500" mb={4} />
          <Heading size="xl" mb={2}>
            Connect Your Wallet
          </Heading>
          <Text color="gray.600">
            Choose your preferred wallet to connect
          </Text>
        </Box>

        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
          gap={6}
          maxW="800px"
          mx="auto"
        >
          {walletOptions.map((option) => (
            <WalletOption key={option.id} option={option} />
          ))}
        </Grid>
      </VStack>
    </Box>
  );
};

export default WalletConnect; 