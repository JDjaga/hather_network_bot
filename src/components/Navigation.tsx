import React, { useState } from 'react';
import {
  Box,
  HStack,
  Icon,
  Text,
  VStack,
  useColorModeValue,
  Tooltip,
  useColorMode,
  Button,
  Spacer,
  Heading,
} from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaHome,
  FaTicketAlt,
  FaWallet,
  FaShoppingCart,
  FaCog,
  FaMoon,
  FaSun,
} from 'react-icons/fa';
import ThemeSettings from './ThemeSettings';

const MotionBox = motion(Box);

interface NavItemType {
  path: string;
  label: string;
  icon: any;
}

const navItems: NavItemType[] = [
  { path: '/', label: 'Dashboard', icon: FaHome },
  { path: '/marketplace', label: 'Marketplace', icon: FaShoppingCart },
  { path: '/my-tickets', label: 'My Tickets', icon: FaTicketAlt },
  { path: '/connect', label: 'Connect Wallet', icon: FaWallet },
];

const navItemVariants = {
  initial: { 
    scale: 1,
    boxShadow: "0 0 0px rgba(0,0,0,0)"
  },
  hover: { 
    scale: 1.05,
    boxShadow: "0 0 15px rgba(0,0,0,0.1)",
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

const buttonVariants = {
  initial: { 
    scale: 1,
    boxShadow: "0 0 0px rgba(0,0,0,0)"
  },
  hover: { 
    scale: 1.05,
    boxShadow: "0 0 15px rgba(0,0,0,0.1)",
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

const NavItemComponent = ({ item, isActive }: { item: NavItemType; isActive: boolean }) => {
  const activeBgColor = useColorModeValue('brand.50', 'brand.900');
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const activeTextColor = useColorModeValue('brand.500', 'brand.300');

  return (
    <Link to={item.path}>
      <Tooltip label={item.label} placement="top">
        <MotionBox
          variants={navItemVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
        >
          <MotionBox
            p={3}
            borderRadius="lg"
            bg={isActive ? activeBgColor : 'transparent'}
            color={isActive ? activeTextColor : textColor}
            _hover={{
              bg: activeBgColor,
              color: activeTextColor,
            }}
            transition={{ duration: 0.2 }}
            boxShadow={isActive ? "0 0 10px rgba(0,0,0,0.1)" : "none"}
            whileHover={{
              boxShadow: isActive ? "0 0 20px rgba(0,0,0,0.2)" : "0 0 15px rgba(0,0,0,0.1)",
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 10
              }
            }}
          >
            <HStack spacing={3}>
              <Icon as={item.icon} w={5} h={5} />
              <Text fontWeight="medium" display={{ base: "none", md: "block" }}>
                {item.label}
              </Text>
            </HStack>
          </MotionBox>
        </MotionBox>
      </Tooltip>
    </Link>
  );
};

const Navigation: React.FC = () => {
  const location = useLocation();
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const { colorMode, toggleColorMode } = useColorMode();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  // Move all useColorModeValue hooks to the top level
  const navBgColor = useColorModeValue('white', 'gray.800');
  const activeBgColor = useColorModeValue('brand.50', 'brand.900');
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const activeTextColor = useColorModeValue('brand.500', 'brand.300');

  return (
    <Box
      as="nav"
      position="fixed"
      left={0}
      top={0}
      bottom={0}
      width="240px"
      bg={navBgColor}
      borderRight="1px"
      borderColor={borderColor}
      p={4}
      zIndex={1000}
    >
      <VStack spacing={8} align="stretch" height="100%">
        <Box>
          <Heading
            size="lg"
            bgGradient="linear(to-r, brand.500, blue.500)"
            bgClip="text"
            textAlign="center"
            mb={4}
          >
            NFT Hub
          </Heading>
          <VStack spacing={2} align="stretch">
            {navItems.map((item) => (
              <NavItemComponent
                key={item.path}
                item={item}
                isActive={location.pathname === item.path}
              />
            ))}
          </VStack>
        </Box>

        <Spacer />

        <VStack spacing={4} align="stretch" width="100%">
          <MotionBox
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            initial="initial"
            width="100%"
          >
            <Button
              leftIcon={<Icon as={FaCog} />}
              variant="ghost"
              width="100%"
              justifyContent="flex-start"
              onClick={() => setIsSettingsOpen(true)}
              color={textColor}
              _hover={{
                bg: activeBgColor,
                color: activeTextColor,
              }}
            >
              Settings
            </Button>
          </MotionBox>

          <MotionBox
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            initial="initial"
            width="100%"
          >
            <Button
              leftIcon={<Icon as={colorMode === 'light' ? FaMoon : FaSun} />}
              variant="ghost"
              width="100%"
              justifyContent="flex-start"
              onClick={toggleColorMode}
              color={textColor}
              _hover={{
                bg: activeBgColor,
                color: activeTextColor,
              }}
            >
              {colorMode === 'light' ? 'Dark Mode' : 'Light Mode'}
            </Button>
          </MotionBox>
        </VStack>
      </VStack>

      <ThemeSettings
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </Box>
  );
};

export default Navigation; 