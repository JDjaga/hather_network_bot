import React, { useState } from 'react';
import {
  Box,
  Text,
  SimpleGrid,
  Image,
  Badge,
  useColorModeValue,
  VStack,
  HStack,
  Icon,
  Button,
  Heading,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Center,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaEthereum, FaBtc, FaCalendarAlt as CalendarIcon, FaMapMarkerAlt as MapIcon, FaTicketAlt as TicketIcon } from 'react-icons/fa';
import { SiBinance, SiPolygon } from 'react-icons/si';
import { QRCodeSVG } from 'qrcode.react';
import GlowBox from '../components/shared/GlowBox';

const MotionBox = motion(Box);
const MotionImage = motion(Image);
const MotionFlex = motion(Flex);

interface Ticket {
  id: string;
  name: string;
  image: string;
  collection: string;
  chain: string;
  value: number;
  type: 'ticket';
  eventDate: string;
  location: string;
}

const ticketData: Ticket[] = [
  {
    id: '1',
    name: 'Summer Music Festival 2024',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    collection: 'Event Tickets',
    chain: 'ethereum',
    value: 150,
    type: 'ticket',
    eventDate: '2024-07-15',
    location: 'Central Park, New York'
  },
  {
    id: '2',
    name: 'Tech Conference 2024',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    collection: 'Event Tickets',
    chain: 'polygon',
    value: 299,
    type: 'ticket',
    eventDate: '2024-09-20',
    location: 'Convention Center, San Francisco'
  }
];

const TicketMarketplace = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const cardBgColor = useColorModeValue('gray.50', 'gray.700');
  const modalBgColor = useColorModeValue('white', 'gray.800');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

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

  const imageVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.3,
      },
    },
  };

  const handleBuyTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    onOpen();
  };

  const generateQRData = (ticket: Ticket) => {
    return JSON.stringify({
      id: ticket.id,
      name: ticket.name,
      collection: ticket.collection,
      chain: ticket.chain,
      type: 'ticket',
      eventDate: ticket.eventDate,
      location: ticket.location,
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <Box p={8}>
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
              NFT Ticket Marketplace
            </Heading>
          </MotionFlex>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {ticketData.map((ticket) => (
              <MotionBox
                key={ticket.id}
                variants={itemVariants}
                whileHover="hover"
                whileTap="tap"
                initial="initial"
              >
                <GlowBox
                  p={4}
                  bg={cardBgColor}
                  borderRadius="xl"
                  boxShadow="lg"
                  glowColor={getChainColor(ticket.chain)}
                  glowIntensity={0.6}
                  variants={glowVariants}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: `0 0 30px ${getChainColor(ticket.chain)}`,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 10
                    }
                  }}
                >
                  <VStack spacing={4} align="stretch">
                    <Box
                      position="relative"
                      borderRadius="lg"
                      overflow="hidden"
                      height="200px"
                    >
                      <MotionImage
                        src={ticket.image}
                        alt={ticket.name}
                        objectFit="cover"
                        width="100%"
                        height="100%"
                        variants={imageVariants}
                        whileHover="hover"
                      />
                      <Badge
                        position="absolute"
                        top={2}
                        right={2}
                        colorScheme="brand"
                        p={1}
                        borderRadius="md"
                      >
                        <HStack spacing={1}>
                          <Icon as={getChainIcon(ticket.chain)} />
                          <Text fontSize="xs">{ticket.chain}</Text>
                        </HStack>
                      </Badge>
                    </Box>

                    <VStack align="stretch" spacing={2}>
                      <Heading size="md" noOfLines={1}>
                        {ticket.name}
                      </Heading>
                      <Text color="gray.500" fontSize="sm">
                        {ticket.collection}
                      </Text>
                      <HStack spacing={2}>
                        <Icon as={CalendarIcon} color="gray.500" />
                        <Text fontSize="sm" color="gray.600">
                          {ticket.eventDate}
                        </Text>
                      </HStack>
                      <HStack spacing={2}>
                        <Icon as={MapIcon} color="gray.500" />
                        <Text fontSize="sm" color="gray.600">
                          {ticket.location}
                        </Text>
                      </HStack>
                      <HStack justify="space-between" align="center">
                        <Text fontWeight="bold" fontSize="lg">
                          ${ticket.value}
                        </Text>
                        <Button
                          leftIcon={<TicketIcon />}
                          colorScheme="brand"
                          size="sm"
                          onClick={() => handleBuyTicket(ticket)}
                        >
                          Buy Ticket
                        </Button>
                      </HStack>
                    </VStack>
                  </VStack>
                </GlowBox>
              </MotionBox>
            ))}
          </SimpleGrid>
        </VStack>
      </MotionBox>

      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent bg={modalBgColor}>
          <ModalHeader>Ticket QR Code</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {selectedTicket && (
              <VStack spacing={4}>
                <Text fontWeight="bold">{selectedTicket.name}</Text>
                <Text>Event Date: {selectedTicket.eventDate}</Text>
                <Text>Location: {selectedTicket.location}</Text>
                <Center p={4} bg="white" borderRadius="md">
                  <QRCodeSVG
                    value={generateQRData(selectedTicket)}
                    size={200}
                    level="H"
                  />
                </Center>
                <Text fontSize="sm" color="gray.500">
                  Scan this QR code at the event entrance
                </Text>
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default TicketMarketplace; 