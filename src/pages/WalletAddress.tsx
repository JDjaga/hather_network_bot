import React, { useState } from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  Input,
  Button,
  useColorModeValue,
  Icon,
  HStack,
} from '@chakra-ui/react';
import { FaWallet } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import GlowBox from '../components/shared/GlowBox';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const walletColors: { [key: string]: string } = {
  metamask: 'orange.500',
  binance: 'yellow.500',
  polygon: 'purple.500',
  hathor: 'blue.500',
};

const walletIcons: { [key: string]: any } = {
  metamask: 'FaEthereum',
  binance: 'SiBinance',
  polygon: 'SiPolygon',
  hathor: 'FaBtc',
};

const WalletAddress = () => {
  const { walletId } = useParams<{ walletId: string }>();
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const bgColor = useColorModeValue('white', 'gray.800');
  const glowColor = walletId ? walletColors[walletId] : 'brand.500';

  const handleConnect = () => {
    // Here you would typically validate the address and connect to the wallet
    console.log(`Connecting to ${walletId} with address: ${address}`);
    // After successful connection, you might want to navigate to another page
    // navigate('/dashboard');
  };

  return (
    <Box p={8}>
      <VStack spacing={8} align="stretch" maxW="600px" mx="auto">
        <Box textAlign="center">
          <Icon as={FaWallet} w={12} h={12} color={glowColor} mb={4} />
          <Heading size="xl" mb={2}>
            Enter Your Wallet Address
          </Heading>
          <Text color="gray.600">
            Please enter your {walletId} wallet address to connect
          </Text>
        </Box>

        <VStack spacing={6}>
          <Input
            placeholder="Enter your wallet address"
            size="lg"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            bg={bgColor}
            borderRadius="xl"
            borderColor="gray.200"
            _hover={{ borderColor: glowColor }}
            _focus={{ borderColor: glowColor, boxShadow: `0 0 0 1px ${glowColor}` }}
          />

          <MotionBox
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <GlowBox
              as={Button}
              size="lg"
              w="200px"
              colorScheme={glowColor.split('.')[0]}
              onClick={handleConnect}
              glowColor={glowColor}
              glowIntensity={0.8}
              whileHover={{
                boxShadow: `0 0 30px var(--chakra-colors-${glowColor.replace('.', '-')}), 0 0 50px rgba(49, 130, 206, 0.3)`,
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 10
                }
              }}
            >
              Connect
            </GlowBox>
          </MotionBox>
        </VStack>
      </VStack>
    </Box>
  );
};

export default WalletAddress; 