import React, { useState } from 'react';
import {
  Box,
  Text,
  VStack,
  HStack,
  Icon,
  Badge,
  useColorModeValue,
  Divider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Flex,
  Select,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Tooltip,
  useToast,
  Heading,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import {
  FaArrowUp,
  FaArrowDown,
  FaExchangeAlt,
  FaEthereum,
  FaBtc,
  FaSearch,
  FaFilter,
  FaDownload,
  FaSync,
  FaTicketAlt,
} from 'react-icons/fa';
import { SiBinance, SiPolygon } from 'react-icons/si';
import NeonGlow from './shared/NeonGlow';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

interface Transaction {
  id: string;
  type: 'buy' | 'sell' | 'transfer';
  asset: string;
  amount: number;
  value: number;
  date: string;
  chain: string;
  status: 'completed' | 'pending' | 'failed';
}

interface TransactionHistoryProps {
  transactions: Transaction[];
}

const getTransactionIcon = (type: string) => {
  switch (type) {
    case 'buy':
      return FaArrowDown;
    case 'sell':
      return FaArrowUp;
    case 'transfer':
      return FaExchangeAlt;
    default:
      return FaExchangeAlt;
  }
};

const getTransactionColor = (type: string) => {
  switch (type) {
    case 'buy':
      return 'green.500';
    case 'sell':
      return 'red.500';
    case 'transfer':
      return 'blue.500';
    default:
      return 'gray.500';
  }
};

const getChainIcon = (chain: string) => {
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

const getChainColor = (chain: string) => {
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

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'green';
    case 'pending':
      return 'yellow';
    case 'failed':
      return 'red';
    default:
      return 'gray';
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0,
    y: 20,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

const glowVariants = {
  initial: { 
    boxShadow: "0 0 0px rgba(0,0,0,0)",
    scale: 1
  },
  hover: { 
    boxShadow: "0 0 20px rgba(0,0,0,0.2)",
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 10
    }
  }
};

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const cardBgColor = useColorModeValue('gray.50', 'gray.700');

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
      whileHover={{
        boxShadow: "0 0 30px rgba(128, 90, 213, 0.5), 0 0 50px rgba(49, 130, 206, 0.3)",
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
      <MotionFlex
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
        mb={6}
      >
        <Heading size="lg" bgGradient="linear(to-r, brand.500, blue.500)" bgClip="text">
          Recent Transactions
        </Heading>
      </MotionFlex>
      
      <VStack spacing={4} align="stretch">
        {transactions.map((transaction) => (
          <MotionBox
            key={transaction.id}
            variants={glowVariants}
            whileHover="hover"
            initial="initial"
            p={4}
            bg={cardBgColor}
            borderRadius="lg"
          >
            <MotionBox
              whileHover={{ 
                scale: 1.05,
                boxShadow: `0 0 20px ${getTransactionColor(transaction.type)}`,
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 10
                }
              }}
              p={4}
              borderRadius="lg"
              boxShadow={`0 0 10px ${getTransactionColor(transaction.type)}`}
            >
              <HStack justify="space-between" align="center">
                <HStack spacing={4}>
                  <Icon
                    as={getTransactionIcon(transaction.type)}
                    w={6}
                    h={6}
                    color={getTransactionColor(transaction.type)}
                  />
                  <VStack align="start" spacing={1}>
                    <Text fontWeight="medium">
                      {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}{' '}
                      {transaction.asset}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      {new Date(transaction.date).toLocaleDateString()}
                    </Text>
                  </VStack>
                </HStack>
                
                <HStack spacing={4}>
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
                  <VStack align="end" spacing={1}>
                    <Text fontWeight="bold">
                      {transaction.type === 'sell' ? '-' : '+'}{transaction.amount} {transaction.asset}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      ${transaction.value.toLocaleString()}
                    </Text>
                  </VStack>
                  <Badge colorScheme={getStatusColor(transaction.status)}>
                    {transaction.status}
                  </Badge>
                </HStack>
              </HStack>
            </MotionBox>
          </MotionBox>
        ))}
      </VStack>
    </MotionBox>
  );
};

export default TransactionHistory; 