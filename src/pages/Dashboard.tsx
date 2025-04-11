import React, { useState } from 'react';
import {
  Box,
  Grid,
  Heading,
  Text,
  useColorModeValue,
  VStack,
  HStack,
  Icon,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  Select,
  Flex,
  Spinner,
  SimpleGrid,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaWallet, FaTicketAlt, FaChartLine, FaFilter, FaSync } from 'react-icons/fa';
import { FaEthereum, FaBtc } from 'react-icons/fa';
import { SiBinance, SiPolygon } from 'react-icons/si';
import GlowBox from '../components/shared/GlowBox';

// Components
import PortfolioChart from '../components/PortfolioChart';
import NFTCollection from '../components/NFTCollection';
import TransactionHistory from '../components/TransactionHistory';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

interface NFT {
  id: string;
  name: string;
  image: string;
  collection: string;
  chain: string;
  value: number;
  type: 'nft' | 'ticket';
  eventDate?: string;
  location?: string;
}

interface Transaction {
  id: string;
  type: 'purchase' | 'transfer' | 'gift';
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

// Sample data
const portfolioData = [
  { name: 'Ethereum', value: 12500, percentage: 35, icon: FaEthereum, color: 'purple.500' },
  { name: 'Binance', value: 8500, percentage: 25, icon: SiBinance, color: 'yellow.500' },
  { name: 'Polygon', value: 6200, percentage: 18, icon: SiPolygon, color: 'pink.500' },
  { name: 'Hathor', value: 9300, percentage: 22, icon: FaBtc, color: 'blue.500' },
];

const nftData: NFT[] = [
  {
    id: '1',
    name: 'Bored Ape #1234',
    image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    collection: 'Bored Ape Yacht Club',
    chain: 'ethereum',
    value: 25000,
    type: 'nft'
  },
  {
    id: '2',
    name: 'CryptoPunk #5678',
    image: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    collection: 'CryptoPunks',
    chain: 'ethereum',
    value: 18000,
    type: 'nft'
  },
  {
    id: '3',
    name: 'Hathor NFT #9012',
    image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    collection: 'Hathor Collection',
    chain: 'hathor',
    value: 12000,
    type: 'nft'
  }
];

const transactionData: Transaction[] = [
  {
    id: '1',
    type: 'purchase',
    amount: 100,
    date: '2024-04-10T12:00:00Z',
    status: 'completed'
  },
  {
    id: '2',
    type: 'transfer',
    amount: 50,
    date: '2024-04-09T15:30:00Z',
    status: 'pending'
  },
  {
    id: '3',
    type: 'gift',
    amount: 25,
    date: '2024-04-08T09:15:00Z',
    status: 'completed'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
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

const Dashboard = () => {
  const [timeframe, setTimeframe] = useState('7d');
  const [isLoading, setIsLoading] = useState(false);
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate data refresh
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const chainColors = {
    ethereum: 'purple.500',
    binance: 'yellow.500',
    polygon: 'red.500',
    hathor: 'gray.900',
  };

  return (
    <Box p={8}>
      <MotionBox
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        whileHover={{
          boxShadow: "0 0 30px rgba(0,0,0,0.1)",
          transition: { duration: 0.3 }
        }}
      >
        <VStack spacing={8} align="stretch">
          <Flex justify="space-between" align="center">
            <MotionBox variants={itemVariants}>
              <MotionBox
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
              >
                <Heading size="xl" mb={2} bgGradient="linear(to-r, brand.500, blue.500)" bgClip="text">
                  NFT Portfolio Dashboard
                </Heading>
              </MotionBox>
              <Text color="gray.600">
                Track your NFTs and tickets across multiple chains
              </Text>
            </MotionBox>
            
            <MotionBox variants={itemVariants}>
              <MotionBox
                whileHover={{
                  boxShadow: "0 0 20px rgba(0,0,0,0.1)",
                  scale: 1.02,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 10
                  }
                }}
              >
                <Select
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                  size="sm"
                  width="120px"
                  bg={useColorModeValue('white', 'gray.700')}
                  borderColor={useColorModeValue('gray.200', 'gray.600')}
                  _hover={{
                    borderColor: useColorModeValue('gray.300', 'gray.500'),
                  }}
                  _focus={{
                    borderColor: 'brand.500',
                    boxShadow: '0 0 0 1px brand.500',
                  }}
                >
                  <option value="24h">24h</option>
                  <option value="7d">7d</option>
                  <option value="30d">30d</option>
                  <option value="1y">1y</option>
                  <option value="all">All time</option>
                </Select>
              </MotionBox>
            </MotionBox>
          </Flex>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={8}>
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <GlowBox
                p={6}
                bg={useColorModeValue('white', 'gray.800')}
                borderRadius="xl"
                boxShadow="lg"
                glowColor="purple.500"
                glowIntensity={0.8}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(128, 90, 213, 0.5), 0 0 50px rgba(49, 130, 206, 0.3)",
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 10
                  }
                }}
              >
                <VStack align="start" spacing={2}>
                  <Text fontSize="sm" color="gray.500">Total Value</Text>
                  <Text fontSize="2xl" fontWeight="bold">$124,500</Text>
                  <Text fontSize="sm" color="green.500">+12.5%</Text>
                </VStack>
              </GlowBox>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <GlowBox
                p={6}
                bg={useColorModeValue('white', 'gray.800')}
                borderRadius="xl"
                boxShadow="lg"
                glowColor="blue.500"
                glowIntensity={0.8}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(66, 153, 225, 0.5), 0 0 50px rgba(49, 130, 206, 0.3)",
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 10
                  }
                }}
              >
                <VStack align="start" spacing={2}>
                  <Text fontSize="sm" color="gray.500">Active Tickets</Text>
                  <Text fontSize="2xl" fontWeight="bold">8</Text>
                  <Text fontSize="sm" color="blue.500">View All</Text>
                </VStack>
              </GlowBox>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <GlowBox
                p={6}
                bg={useColorModeValue('white', 'gray.800')}
                borderRadius="xl"
                boxShadow="lg"
                glowColor="green.500"
                glowIntensity={0.8}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(72, 187, 120, 0.5), 0 0 50px rgba(49, 130, 206, 0.3)",
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 10
                  }
                }}
              >
                <VStack align="start" spacing={2}>
                  <Text fontSize="sm" color="gray.500">Portfolio Growth</Text>
                  <Text fontSize="2xl" fontWeight="bold">+24.3%</Text>
                  <Text fontSize="sm" color="purple.500">Last 30 Days</Text>
                </VStack>
              </GlowBox>
            </MotionBox>
          </SimpleGrid>

          <Tabs variant="enclosed" colorScheme="brand">
            <TabList>
              <Tab>Portfolio</Tab>
              <Tab>NFTs</Tab>
              <Tab>Transactions</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <PortfolioChart data={portfolioData} totalValue={24500} />
              </TabPanel>
              <TabPanel>
                <NFTCollection nfts={nftData} title="My NFT Collection" />
              </TabPanel>
              <TabPanel>
                <TransactionHistory transactions={transactionData} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </MotionBox>
    </Box>
  );
};

export default Dashboard; 