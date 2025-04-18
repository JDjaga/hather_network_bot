import React, { useState } from 'react';
import {
  Box,
  Grid,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  SimpleGrid,
  Image,
  Badge,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { FaTicketAlt, FaCalendarAlt, FaMapMarkerAlt, FaShare } from 'react-icons/fa';
import GlowBox from '../components/shared/GlowBox';

const MotionBox = motion(Box);

interface Ticket {
  id: string;
  title: string;
  date: string;
  location: string;
  qrData: string;
  status: 'active' | 'used' | 'expired';
}

const sampleTickets: Ticket[] = [
  {
    id: '1',
    title: 'Summer Music Festival 2024',
    date: 'July 15, 2024',
    location: 'Central Park, New York',
    qrData: 'ticket-123-456-789',
    status: 'active',
  },
  {
    id: '2',
    title: 'Tech Conference 2024',
    date: 'September 20, 2024',
    location: 'Convention Center, San Francisco',
    qrData: 'ticket-987-654-321',
    status: 'active',
  },
];

const TicketCard = ({ ticket }: { ticket: Ticket }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const getStatusColor = (status: Ticket['status']) => {
    switch (status) {
      case 'active':
        return 'green';
      case 'used':
        return 'gray';
      case 'expired':
        return 'red';
      default:
        return 'gray';
    }
  };

  return (
    <>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <GlowBox
          p={6}
          bg={bgColor}
          borderRadius="xl"
          boxShadow="lg"
          glowColor="brand.500"
          glowIntensity={0.6}
        >
          <VStack align="start" spacing={4}>
            <Image
              src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
              alt="Summer Music Festival"
              borderRadius="lg"
              width="100%"
              height="200px"
              objectFit="cover"
            />
            <VStack align="start" spacing={2} width="100%">
              <Text fontSize="xl" fontWeight="bold">{ticket.title}</Text>
              <Text color="gray.500">{ticket.date}</Text>
              <HStack justify="space-between" width="100%">
                <Text color="brand.500" fontWeight="bold">{ticket.location}</Text>
                <Badge colorScheme={getStatusColor(ticket.status)}>{ticket.status.toUpperCase()}</Badge>
              </HStack>
            </VStack>
          </VStack>
        </GlowBox>
      </MotionBox>

      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Ticket QR Code</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4}>
              <Box p={4} bg="white" borderRadius="lg">
                <QRCodeSVG
                  value={ticket.qrData}
                  size={200}
                  level="H"
                  includeMargin
                />
              </Box>
              <Text color="gray.600" textAlign="center">
                Show this QR code at the event entrance
              </Text>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

const MyTickets = () => {
  return (
    <Box 
      p={8}
      height="100vh"
      overflowY="auto"
      css={{
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
        scrollBehavior: 'smooth',
        '-webkit-overflow-scrolling': 'touch'
      }}
    >
      <VStack spacing={8} align="stretch" minH="100%" pb={8}>
        <Box>
          <Heading size="xl" mb={2}>
            My NFT Tickets
          </Heading>
          <Text color="gray.600">
            Manage and view your event tickets
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
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
              glowColor="brand.500"
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
              <VStack align="start" spacing={4}>
                <Image
                  src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                  alt="Summer Music Festival"
                  borderRadius="lg"
                  width="100%"
                  height="200px"
                  objectFit="cover"
                />
                <VStack align="start" spacing={2} width="100%">
                  <Text fontSize="xl" fontWeight="bold">Summer Music Festival</Text>
                  <Text color="gray.500">VIP Pass - Day 1</Text>
                  <HStack justify="space-between" width="100%">
                    <Text color="brand.500" fontWeight="bold">0.5 ETH</Text>
                    <Badge colorScheme="green">Active</Badge>
                  </HStack>
                </VStack>
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
              <VStack align="start" spacing={4}>
                <Image
                  src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                  alt="Tech Conference 2024"
                  borderRadius="lg"
                  width="100%"
                  height="200px"
                  objectFit="cover"
                />
                <VStack align="start" spacing={2} width="100%">
                  <Text fontSize="xl" fontWeight="bold">Tech Conference 2024</Text>
                  <Text color="gray.500">All Access Pass</Text>
                  <HStack justify="space-between" width="100%">
                    <Text color="brand.500" fontWeight="bold">1.2 ETH</Text>
                    <Badge colorScheme="green">Active</Badge>
                  </HStack>
                </VStack>
              </VStack>
            </GlowBox>
          </MotionBox>
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default MyTickets;