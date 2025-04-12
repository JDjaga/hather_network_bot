import { Box, VStack, HStack, Text, Icon, useColorModeValue } from '@chakra-ui/react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { motion } from 'framer-motion';
import type { IconType } from 'react-icons';

interface PortfolioItem {
  name: string;
  value: number;
  percentage: number;
  icon: IconType;
  color: string;
}

interface PortfolioChartProps {
  data: PortfolioItem[];
  totalValue: number;
}

const MotionBox = motion(Box);

const PortfolioChart: React.FC<PortfolioChartProps> = ({ data, totalValue }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const cardBgColor = useColorModeValue('gray.50', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.400');

  // Define fixed colors for each chain that won't change with color mode
  const chainColors = {
    ethereum: '#805AD5', // purple.500
    binance: '#ECC94B', // yellow.500
    polygon: '#ED64A6', // pink.500
    hathor: '#4299E1', // blue.500
  };

  const chartData = data.map(item => ({
    name: item.name,
    value: item.value,
    percentage: item.percentage,
    color: chainColors[item.name.toLowerCase() as keyof typeof chainColors] || '#718096', // gray.500 as fallback
    icon: item.icon,
  }));

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <MotionBox
      initial="hidden"
      animate="visible"
      variants={containerVariants}
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
      <VStack spacing={6} align="stretch">
        <HStack justify="space-between">
          <Text fontSize={{ base: 'md', sm: 'xl' }} fontWeight="bold">
            Portfolio Distribution
          </Text>
          <Text fontSize={{ base: 'md', sm: 'xl' }} fontWeight="bold" color="brand.500">
            ${totalValue.toLocaleString()}
          </Text>
        </HStack>
        
        <Box height={{ base: '200px', sm: '300px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => `$${value.toLocaleString()}`}
                contentStyle={{
                  backgroundColor: bgColor,
                  border: `1px solid ${borderColor}`,
                  borderRadius: '8px',
                  color: textColor,
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Box>

        <VStack spacing={{ base: 2, sm: 4 }} align="stretch">
          {chartData.map((item) => (
            <MotionBox
              key={item.name}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <HStack justify="space-between" p={3} borderRadius="md" bg={cardBgColor} spacing={{ base: 3, sm: 4 }}>
                <HStack>
                  <Icon as={item.icon as unknown as IconType} w={6} h={6} color={item.color} />
                  <Text fontWeight="medium" fontSize={{ base: 'sm', sm: 'md' }}>{item.name}</Text>
                </HStack>
                <HStack spacing={4}>
                  <Text color={textColor}>${item.value.toLocaleString()}</Text>
                  <Text color="brand.500">{item.percentage}%</Text>
                </HStack>
              </HStack>
            </MotionBox>
          ))}
        </VStack>
      </VStack>
    </MotionBox>
  );
};

export default PortfolioChart; 