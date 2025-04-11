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
import { FaEthereum, FaBtc, FaTicketAlt } from 'react-icons/fa';
import { SiBinance, SiPolygon } from 'react-icons/si';
import { QRCodeSVG } from 'qrcode.react';
import GlowBox from './shared/GlowBox';

const MotionBox = motion(Box);
const MotionImage = motion(Image);
const MotionFlex = motion(Flex);

interface NFT {
  id: string;
  name: string;
  image: string;
  collection: string;
  chain: string;
  value: number;
  type?: 'ticket' | 'nft';
  eventDate?: string;
  location?: string;
}

interface NFTCollectionProps {
  nfts: NFT[];
  title: string;
}

const NFTCollection: React.FC<NFTCollectionProps> = ({ nfts, title }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const cardBgColor = useColorModeValue('gray.50', 'gray.700');
  const modalBgColor = useColorModeValue('white', 'gray.800');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);

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
    },
    tap: {
      scale: 0.95,
      transition: {
        type: "spring",
        stiffness: 400,
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

  const handleBuyTicket = (nft: NFT) => {
    setSelectedNFT(nft);
    onOpen();
  };

  const generateQRData = (nft: NFT) => {
    return JSON.stringify({
      id: nft.id,
      name: nft.name,
      collection: nft.collection,
      chain: nft.chain,
      type: 'ticket',
      eventDate: nft.eventDate,
      location: nft.location,
      timestamp: new Date().toISOString(),
    });
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
            {title}
          </Heading>
        </MotionFlex>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {nfts.map((nft, index) => (
            <MotionBox
              key={nft.id}
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
                glowColor={getChainColor(nft.chain)}
                glowIntensity={0.6}
                variants={glowVariants}
                whileHover={{
                  scale: 1.05,
                  boxShadow: `0 0 30px ${getChainColor(nft.chain)}`,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 10
                  }
                }}
                whileTap={{
                  scale: 0.95,
                  transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 10
                  }
                }}
              >
                <VStack spacing={4} align="stretch">
                  <Box position="relative" height="200px" borderRadius="lg" overflow="hidden">
                    <MotionImage
                      src={nft.image}
                      alt={nft.name}
                      variants={imageVariants}
                      whileHover="hover"
                      width="100%"
                      height="100%"
                      objectFit="cover"
                    />
                    <Badge
                      position="absolute"
                      top={2}
                      right={2}
                      colorScheme={nft.chain === 'ethereum' ? 'purple' : 
                                  nft.chain === 'binance' ? 'yellow' : 
                                  nft.chain === 'polygon' ? 'pink' : 'blue'}
                    >
                      {nft.chain}
                    </Badge>
                  </Box>
                  <VStack align="start" spacing={1}>
                    <Text fontWeight="bold" fontSize="lg">{nft.name}</Text>
                    <Text color="gray.500" fontSize="sm">{nft.collection}</Text>
                    <HStack justify="space-between" width="100%">
                      <HStack>
                        <Icon as={getChainIcon(nft.chain)} color={getChainColor(nft.chain)} />
                        <Text fontWeight="bold">${nft.value.toLocaleString()}</Text>
                      </HStack>
                      {nft.type === 'ticket' && (
                        <Badge colorScheme="green">Ticket</Badge>
                      )}
                    </HStack>
                    {nft.type === 'ticket' && (
                      <Button
                        leftIcon={<Icon as={FaTicketAlt} />}
                        colorScheme="green"
                        size="sm"
                        width="100%"
                        onClick={() => handleBuyTicket(nft)}
                        mt={2}
                      >
                        Buy Ticket
                      </Button>
                    )}
                  </VStack>
                </VStack>
              </GlowBox>
            </MotionBox>
          ))}
        </SimpleGrid>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent bg={modalBgColor} borderRadius="xl">
          <ModalHeader>
            <Heading size="md" bgGradient="linear(to-r, brand.500, blue.500)" bgClip="text">
              {selectedNFT?.name} - Ticket QR Code
            </Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4}>
              <Center p={4} bg="white" borderRadius="lg" boxShadow="md">
                {selectedNFT && (
                  <QRCodeSVG
                    value={generateQRData(selectedNFT)}
                    size={200}
                    level="H"
                    includeMargin={true}
                  />
                )}
              </Center>
              <Text fontSize="sm" color="gray.500" textAlign="center">
                Scan this QR code at the event entrance
              </Text>
              {selectedNFT?.eventDate && (
                <Text fontSize="sm" fontWeight="medium">
                  Event Date: {new Date(selectedNFT.eventDate).toLocaleDateString()}
                </Text>
              )}
              {selectedNFT?.location && (
                <Text fontSize="sm" fontWeight="medium">
                  Location: {selectedNFT.location}
                </Text>
              )}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </MotionBox>
  );
};

export default NFTCollection; 