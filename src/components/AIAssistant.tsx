import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  VStack,
  HStack,
  Icon,
  Badge,
  useColorModeValue,
  Button,
  Input,
  Textarea,
  Avatar,
  AvatarGroup,
  Tooltip,
  Divider,
  useToast,
  Spinner,
  Flex,
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  TagCloseButton,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaRobot, FaTicketAlt, FaCalendarAlt, FaThumbsUp, FaThumbsDown, FaSearch, FaFilter, FaChevronRight } from 'react-icons/fa';

const MotionBox = motion(Box);

interface Recommendation {
  id: string;
  type: 'event' | 'ticket' | 'collection';
  title: string;
  description: string;
  image: string;
  price?: number;
  date?: string;
  location?: string;
  relevance: number;
  source: 'past_purchases' | 'token_holdings' | 'popular' | 'trending';
  tags: string[];
}

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const AIAssistant: React.FC = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([
    {
      id: '1',
      type: 'event',
      title: 'Crypto Conference 2023',
      description: 'Annual blockchain and cryptocurrency conference featuring industry leaders.',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      price: 299,
      date: '2023-12-15',
      location: 'San Francisco, CA',
      relevance: 0.95,
      source: 'past_purchases',
      tags: ['conference', 'blockchain', 'networking'],
    },
    {
      id: '2',
      type: 'ticket',
      title: 'VIP Pass - NFT Art Exhibition',
      description: 'Exclusive access to the NFT art exhibition with meet & greet with artists.',
      image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      price: 149,
      date: '2023-11-20',
      location: 'New York, NY',
      relevance: 0.88,
      source: 'token_holdings',
      tags: ['art', 'exhibition', 'vip'],
    },
    {
      id: '3',
      type: 'collection',
      title: 'Bored Ape Yacht Club',
      description: 'Based on your interest in collectibles, you might like this popular NFT collection.',
      image: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      relevance: 0.82,
      source: 'trending',
      tags: ['nft', 'collectibles', 'popular'],
    },
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'assistant',
      content: 'Hello! I can help you discover events, tickets, and NFT collections based on your interests. What would you like to explore today?',
      timestamp: new Date(Date.now() - 300000).toISOString(),
    },
  ]);

  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const toast = useToast();

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const cardBgColor = useColorModeValue('gray.50', 'gray.700');
  const assistantBgColor = useColorModeValue('blue.50', 'blue.900');
  const userBgColor = useColorModeValue('brand.50', 'brand.900');

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: inputValue,
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, newUserMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        content: generateAIResponse(inputValue),
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): string => {
    // In a real app, this would call an AI API
    const lowerInput = userInput.toLowerCase();
    
    if (lowerInput.includes('event') || lowerInput.includes('conference')) {
      return 'I found some events that match your interests. The Crypto Conference 2023 in San Francisco might be perfect for you, based on your past attendance at similar events.';
    } else if (lowerInput.includes('ticket') || lowerInput.includes('pass')) {
      return 'Here are some tickets you might be interested in. The VIP Pass for the NFT Art Exhibition could be a great match based on your art collection.';
    } else if (lowerInput.includes('nft') || lowerInput.includes('collection')) {
      return 'Based on your token holdings, I think you might like the Bored Ape Yacht Club collection. It\'s currently trending and matches your collecting style.';
    } else {
      return 'I can help you discover events, tickets, and NFT collections. Would you like to see recommendations based on your past purchases or current holdings?';
    }
  };

  const handleFilterToggle = (tag: string) => {
    if (activeFilters.includes(tag)) {
      setActiveFilters(activeFilters.filter(t => t !== tag));
    } else {
      setActiveFilters([...activeFilters, tag]);
    }
  };

  const filteredRecommendations = activeFilters.length > 0
    ? recommendations.filter(rec => 
        rec.tags.some(tag => activeFilters.includes(tag))
      )
    : recommendations;

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

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'past_purchases':
        return FaTicketAlt;
      case 'token_holdings':
        return FaCalendarAlt;
      case 'popular':
        return FaThumbsUp;
      case 'trending':
        return FaFilter;
      default:
        return FaRobot;
    }
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'past_purchases':
        return 'green';
      case 'token_holdings':
        return 'blue';
      case 'popular':
        return 'purple';
      case 'trending':
        return 'orange';
      default:
        return 'gray';
    }
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
        boxShadow: "0 0 30px rgba(0,0,0,0.1)",
        transition: { duration: 0.3 }
      }}
    >
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
          boxShadow: "0 0 30px rgba(0,0,0,0.2)",
          scale: 1.01,
          transition: { duration: 0.2 }
        }}
      >
        <HStack mb={4}>
          <Icon as={FaRobot} w={6} h={6} color="brand.500" />
          <Text fontSize="xl" fontWeight="bold">
            AI Assistant
          </Text>
          <Badge colorScheme="brand" ml="auto">
            Powered by AI
          </Badge>
        </HStack>
      </MotionBox>

      <Box 
        height="300px" 
        overflowY="auto" 
        p={4} 
        bg={cardBgColor} 
        borderRadius="lg" 
        mb={4}
      >
        {messages.map((message) => (
          <MotionBox
            key={message.id}
            variants={itemVariants}
            mb={4}
            alignSelf={message.sender === 'user' ? 'flex-end' : 'flex-start'}
          >
            <HStack 
              spacing={3} 
              align="start"
              justify={message.sender === 'user' ? 'flex-end' : 'flex-start'}
            >
              {message.sender === 'assistant' && (
                <Avatar size="sm" icon={<FaRobot />} bg="brand.500" />
              )}
              <Box
                maxW="80%"
                p={3}
                borderRadius="lg"
                bg={message.sender === 'assistant' ? assistantBgColor : userBgColor}
                color={message.sender === 'assistant' ? 'gray.800' : 'brand.800'}
              >
                <Text>{message.content}</Text>
                <Text fontSize="xs" color="gray.500" mt={1}>
                  {new Date(message.timestamp).toLocaleTimeString()}
                </Text>
              </Box>
              {message.sender === 'user' && (
                <Avatar size="sm" name="User" bg="gray.500" />
              )}
            </HStack>
          </MotionBox>
        ))}
        {isLoading && (
          <HStack spacing={3} align="start" mb={4}>
            <Avatar size="sm" icon={<FaRobot />} bg="brand.500" />
            <Box p={3} borderRadius="lg" bg={assistantBgColor}>
              <Spinner size="sm" mr={2} />
              <Text as="span">Thinking...</Text>
            </Box>
          </HStack>
        )}
      </Box>

      <HStack mb={4}>
        <Input
          placeholder="Ask about events, tickets, or NFT collections..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <Button 
          colorScheme="brand" 
          onClick={handleSendMessage}
          isDisabled={!inputValue.trim() || isLoading}
        >
          Send
        </Button>
      </HStack>

      <Divider mb={4} />

      <Text fontWeight="bold" mb={3}>Recommended for You</Text>

      <HStack mb={4} wrap="wrap" spacing={2}>
        {['conference', 'art', 'nft', 'collectibles', 'exhibition', 'vip'].map((tag) => (
          <Tag
            key={tag}
            size="md"
            colorScheme={activeFilters.includes(tag) ? 'brand' : 'gray'}
            variant={activeFilters.includes(tag) ? 'solid' : 'outline'}
            cursor="pointer"
            onClick={() => handleFilterToggle(tag)}
          >
            <TagLabel>{tag}</TagLabel>
            {activeFilters.includes(tag) && <TagCloseButton />}
          </Tag>
        ))}
      </HStack>

      <VStack spacing={4} align="stretch">
        {filteredRecommendations.map((rec) => (
          <MotionBox
            key={rec.id}
            variants={itemVariants}
            p={4}
            bg={cardBgColor}
            borderRadius="lg"
            borderLeft="4px solid"
            borderLeftColor={`${getSourceColor(rec.source)}.500`}
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
              transition: { duration: 0.2 }
            }}
          >
            <HStack spacing={4} align="start">
              <Box 
                w="80px" 
                h="80px" 
                borderRadius="md" 
                overflow="hidden"
                bgImage={`url(${rec.image})`}
                bgSize="cover"
                bgPosition="center"
              />
              <VStack align="start" spacing={1} flex={1}>
                <HStack justify="space-between" width="100%">
                  <Text fontWeight="bold">{rec.title}</Text>
                  <Badge colorScheme={getSourceColor(rec.source)}>
                    <HStack spacing={1}>
                      <Icon as={getSourceIcon(rec.source)} />
                      <Text>{rec.source.replace('_', ' ')}</Text>
                    </HStack>
                  </Badge>
                </HStack>
                <Text fontSize="sm">{rec.description}</Text>
                {rec.price && (
                  <Text fontWeight="bold" color="brand.500">
                    ${rec.price}
                  </Text>
                )}
                {rec.date && (
                  <Text fontSize="sm" color="gray.500">
                    <Icon as={FaCalendarAlt} mr={1} />
                    {new Date(rec.date).toLocaleDateString()}
                  </Text>
                )}
                {rec.location && (
                  <Text fontSize="sm" color="gray.500">
                    {rec.location}
                  </Text>
                )}
                <HStack mt={2} spacing={2}>
                  {rec.tags.map((tag) => (
                    <Tag key={tag} size="sm" colorScheme="gray" variant="outline">
                      {tag}
                    </Tag>
                  ))}
                </HStack>
              </VStack>
              <Button 
                size="sm" 
                colorScheme="brand" 
                variant="outline"
                rightIcon={<FaChevronRight />}
              >
                View
              </Button>
            </HStack>
          </MotionBox>
        ))}
      </VStack>
    </MotionBox>
  );
};

export default AIAssistant; 