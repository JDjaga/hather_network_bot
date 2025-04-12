import React from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  useColorModeValue,
  Icon,
  HStack,
  SimpleGrid,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaWallet, FaEthereum, FaBtc, FaBitcoin } from 'react-icons/fa';
import { SiBinance, SiPolygon } from 'react-icons/si';
import GlowBox from '../components/shared/GlowBox';
import { useNavigate } from 'react-router-dom';

const MotionBox = motion(Box);

interface WalletOptionProps {
  id: string;
  name: string;
  icon: any;
  color: string;
  description: string;
}

const walletOptions: WalletOptionProps[] = [
  {
    id: 'metamask',
    name: 'MetaMask',
    icon: FaEthereum,
    color: 'var(--chakra-colors-orange-500)',
    description: 'Connect using MetaMask wallet'
  },
  {
    id: 'binance',
    name: 'Binance Wallet',
    icon: SiBinance,
    color: 'var(--chakra-colors-yellow-500)',
    description: 'Connect using Binance wallet'
  },
  {
    id: 'polygon',
    name: 'Polygon Wallet',
    icon: SiPolygon,
    color: 'var(--chakra-colors-purple-500)',
    description: 'Connect using Polygon wallet'
  },
  {
    id: 'hathor',
    name: 'Hathor Wallet',
    icon: FaBitcoin,
    color: 'var(--chakra-colors-blue-500)',
    description: 'Connect using Hathor wallet'
  },
];

const WalletConnect: React.FC = () => {
  const navigate = useNavigate();
  const bgColor = useColorModeValue('white', 'gray.800');

  const handleConnect = (wallet: string) => {
    navigate(`/wallet/${wallet}`);
  };

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

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          {walletOptions.map((option) => (
            <GlowBox
              key={option.name}
              p={6}
              bg={bgColor}
              borderRadius="xl"
              boxShadow="lg"
              glowColor={option.color}
              glowIntensity={0.8}
              onClick={() => handleConnect(option.name)}
              cursor="pointer"
              role="group"
            >
              <HStack spacing={4}>
                <Icon
                  as={option.icon}
                  w={8}
                  h={8}
                  color={option.color}
                />
                <VStack align="start" spacing={1}>
                  <Text fontWeight="bold" fontSize="lg">
                    {option.name}
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    {option.description}
                  </Text>
                </VStack>
              </HStack>
            </GlowBox>
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default WalletConnect; 