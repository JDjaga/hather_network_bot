import React from 'react';
import {
  Box,
  Text,
  VStack,
  HStack,
  Icon,
  useColorModeValue,
  Heading,
  Badge,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import {
  FaExchangeAlt,
  FaTicketAlt,
  FaShoppingCart,
  FaGift,
  FaEthereum,
  FaBtc,
} from 'react-icons/fa';
import { SiBinance, SiPolygon } from 'react-icons/si';

const MotionBox = motion(Box);
const MotionHStack = motion(HStack);

interface Transaction {
  id: string;
  type: 'purchase' | 'transfer' | 'gift';
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  asset?: string;
  value?: number;
  chain?: string;
}

interface TransactionHistoryProps {
  transactions: Transaction[];
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');

  const getTransactionIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'purchase':
        return FaShoppingCart;
      case 'transfer':
        return FaExchangeAlt;
      case 'gift':
        return FaGift;
      default:
        return FaTicketAlt;
    }
  };

  const getStatusColor = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return 'green.500';
      case 'pending':
        return 'yellow.500';
      case 'failed':
        return 'red.500';
      default:
        return 'gray.500';
    }
  };

  const getChainIcon = (chain?: string) => {
    if (!chain) return FaEthereum;
    switch (chain.toLowerCase()) {
      case 'ethereum':
        return FaEthereum;
      case 'binance':
        return SiBinance;
      case 'polygon':
        return SiPolygon;
      case 'hathor':
        return FaBtc;
      default:
        return FaEthereum;
    }
  };

  const getChainColor = (chain?: string) => {
    if (!chain) return 'purple.500';
    switch (chain.toLowerCase()) {
      case 'ethereum':
        return 'purple.500';
      case 'binance':
        return 'yellow.500';
      case 'polygon':
        return 'pink.500';
      case 'hathor':
        return 'blue.500';
      default:
        return 'gray.500';
    }
  };

  const glowVariants = {
    initial: { 
      boxShadow: "0 0 0px rgba(0,0,0,0)",
      scale: 1
    },
    hover: { 
      boxShadow: "0 0 30px rgba(128, 90, 213, 0.5), 0 0 50px rgba(49, 130, 206, 0.3)",
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10,
        boxShadow: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: 2
        }
      }
    }
  };

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      p={6}
      bg={bgColor}
      borderRadius="xl"
      borderWidth="1px"
      borderColor={borderColor}
      boxShadow="lg"
      variants={glowVariants}
      whileHover="hover"
    >
      <MotionHStack
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          type: "spring",
          stiffness: 100,
          damping: 10,
          duration: 0.5 
        }}
        p={4}
        borderRadius="lg"
        boxShadow="0 0 20px rgba(0,0,0,0.1)"
        mb={6}
        whileHover={{
          boxShadow: "0 0 30px rgba(128, 90, 213, 0.5), 0 0 50px rgba(49, 130, 206, 0.3)",
          scale: 1.02,
          transition: { 
            duration: 0.3,
            boxShadow: {
              repeat: Infinity,
              repeatType: "reverse",
              duration: 2
            }
          }
        }}
      >
        <Heading size="lg" bgGradient="linear(to-r, brand.500, blue.500)" bgClip="text">
          Transaction History
        </Heading>
      </MotionHStack>

      <VStack spacing={4} align="stretch">
        {transactions.map((transaction) => (
          <MotionBox
            key={transaction.id}
            variants={glowVariants}
            whileHover="hover"
            p={4}
            borderRadius="lg"
            bg={bgColor}
            borderWidth="1px"
            borderColor={borderColor}
            boxShadow="md"
          >
            <HStack justify="space-between">
              <HStack>
                <Icon as={getTransactionIcon(transaction.type)} w={5} h={5} color="brand.500" />
                <Text fontWeight="medium" color={textColor}>
                  {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                  {transaction.asset && ` ${transaction.asset}`}
                </Text>
              </HStack>
              {transaction.chain && (
                <Badge
                  colorScheme={getChainColor(transaction.chain).split('.')[0]}
                  p={1}
                  borderRadius="md"
                >
                  <HStack spacing={1}>
                    <Box as={getChainIcon(transaction.chain)} />
                    <Text>{transaction.chain}</Text>
                  </HStack>
                </Badge>
              )}
              <Text color={getStatusColor(transaction.status)}>
                {transaction.status}
              </Text>
            </HStack>
            <HStack justify="space-between" mt={2}>
              <Text color={textColor}>
                {new Date(transaction.date).toLocaleDateString()}
              </Text>
              <VStack align="end" spacing={1}>
                <Text fontWeight="bold" color={textColor}>
                  {transaction.amount} TIX
                </Text>
                {transaction.value && (
                  <Text fontSize="sm" color="gray.500">
                    ${transaction.value.toLocaleString()}
                  </Text>
                )}
              </VStack>
            </HStack>
          </MotionBox>
        ))}
      </VStack>
    </MotionBox>
  );
};

export default TransactionHistory; 