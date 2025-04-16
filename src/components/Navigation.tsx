import React, { useState, useEffect } from 'react'; 
import {
  Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay,
  VStack, Box, Heading, Spacer, Icon, useDisclosure, useColorModeValue, useColorMode, useToast,
  HStack, Text, Divider
} from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaHome, FaTicketAlt, FaWallet, FaShoppingCart, FaCog, FaMoon, FaSun, FaSignOutAlt, FaBars
} from 'react-icons/fa';
import ThemeSettings from './ThemeSettings';
import { useBreakpointValue } from '@chakra-ui/react';

const MotionBox = motion(Box);

// ✅ Variants for animated buttons
const buttonVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.03, transition: { duration: 0.2 } },
  tap: { scale: 0.97, transition: { duration: 0.1 } },
};

interface NavItemType {
  path: string;
  label: string;
  icon: any;
}

const navItems: NavItemType[] = [
  { path: '/', label: 'Dashboard', icon: FaHome },
  { path: '/marketplace', label: 'Marketplace', icon: FaShoppingCart },
  { path: '/my-tickets', label: 'My Tickets', icon: FaTicketAlt },
  { path: '/walletconnect', label: 'Connect Wallet', icon: FaWallet },
];

const navItemVariants = {
  initial: { scale: 1, boxShadow: "0 0 0px rgba(0,0,0,0)" },
  hover: {
    scale: 1.05,
    boxShadow: "0 0 15px rgba(0,0,0,0.1)",
    transition: { type: "spring", stiffness: 300, damping: 10 }
  },
  tap: {
    scale: 0.95,
    transition: { type: "spring", stiffness: 400, damping: 10 }
  }
};

const NavItemComponent = ({ item, isActive }: { item: NavItemType; isActive: boolean }) => {
  const activeBgColor = useColorModeValue('brand.50', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const activeTextColor = useColorModeValue('brand.500', 'brand.200');

  return (
    <Link to={item.path}>
      <MotionBox variants={navItemVariants} initial="initial" whileHover="hover" whileTap="tap" position="relative">
        {isActive && (
          <MotionBox
            layoutId="active-indicator"
            position="absolute"
            left={0}
            top={0}
            bottom={0}
            width="4px"
            bg="brand.500"
            borderRadius="md"
          />
        )}
        <MotionBox
          p={3}
          pl={isActive ? 6 : 3}
          borderRadius="lg"
          bg={isActive ? activeBgColor : 'transparent'}
          color={isActive ? activeTextColor : textColor}
          _hover={{ bg: activeBgColor, color: activeTextColor }}
          transition={{ duration: 0.2 }}
          boxShadow={isActive ? "0 0 10px rgba(0,0,0,0.1)" : "none"}
        >
          <HStack spacing={3} justifyContent="flex-start">
            <Icon as={item.icon} w={5} h={5} />
            <Text fontWeight="medium">{item.label}</Text>
          </HStack>
        </MotionBox>
      </MotionBox>
    </Link>
  );
};

const Navigation: React.FC = () => {
  const location = useLocation();
  const { colorMode, toggleColorMode } = useColorMode();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const navBgColor = useColorModeValue('white', 'gray.900');
  const drawerBgColor = useColorModeValue('white', 'gray.900');
  const drawerHeaderColor = useColorModeValue('gray.700', 'gray.200');
  const drawerBodyColor = useColorModeValue('gray.600', 'gray.300');
  const activeBgColor = useColorModeValue('brand.50', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const activeTextColor = useColorModeValue('brand.500', 'brand.200');

  const handleThemeChange = (theme: string) => {
    if (theme === 'dark' && colorMode === 'light') toggleColorMode();
    else if (theme === 'light' && colorMode === 'dark') toggleColorMode();
  };

  const handleLanguageChange = (language: string) => {
    toast({
      title: 'Language Updated',
      description: `Switched to ${language}`,
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  useEffect(() => {
    const handleSwipe = (e: TouchEvent) => {
      if (e.changedTouches[0].clientX < 60) onOpen();
    };
    window.addEventListener('touchstart', handleSwipe);
    return () => window.removeEventListener('touchstart', handleSwipe);
  }, [onOpen]);

  // Breakpoint for drawer size
  const drawerSize = useBreakpointValue({ base: 'xs', sm: 'sm', md: 'md' });

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        onClick={onOpen}
        display={{ base: "inline-block", md: "none" }}
        position="fixed"
        top="20px"
        left="20px"
        zIndex={1001}
        p={2}
        margin={0} // Reduced padding around the button
      >
        <Icon as={FaBars} w={6} h={6} />
      </Button>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size={drawerSize}>
        <DrawerOverlay />
        <DrawerContent bg={drawerBgColor}>
          <DrawerCloseButton />
          <DrawerHeader color={drawerHeaderColor}></DrawerHeader>
          <DrawerBody color={drawerBodyColor} p={0}>
            <VStack spacing={2} align="stretch" m={0} p={0}> {/* Ensure no extra margins or padding */}
              {navItems.map((item) => (
                <NavItemComponent
                  key={item.path}
                  item={item}
                  isActive={location.pathname === item.path}
                />
              ))}
              <Divider />
              <Button
                leftIcon={<FaSignOutAlt />}
                variant="ghost"
                justifyContent="flex-start"
                width="100%"
                onClick={() => toast({ title: 'Logged out', status: 'info', duration: 2000 })}
              >
                Logout
              </Button>

              {/* Settings Button */}
              <MotionBox variants={buttonVariants} whileHover="hover" whileTap="tap" initial="initial" width="100%">
                <Button
                  leftIcon={<Icon as={FaCog} />}
                  variant="ghost"
                  width="100%"
                  justifyContent="flex-start"
                  onClick={() => setIsSettingsOpen(true)}
                  color={textColor}
                  _hover={{ bg: activeBgColor, color: activeTextColor }}
                >
                  Settings
                </Button>
              </MotionBox>

              {/* Theme Toggle */}
              <MotionBox variants={buttonVariants} whileHover="hover" whileTap="tap" initial="initial" width="100%">
                <Button
                  leftIcon={<Icon as={colorMode === 'light' ? FaMoon : FaSun} />}
                  variant="ghost"
                  width="100%"
                  justifyContent="flex-start"
                  onClick={toggleColorMode}
                  color={textColor}
                  _hover={{ bg: activeBgColor, color: activeTextColor }}
                >
                  {colorMode === 'light' ? 'Dark Mode' : 'Light Mode'}
                </Button>
              </MotionBox>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Desktop Sidebar */}
      <Box
        as="nav"
        position="fixed"
        left={0}
        top={0}
        bottom={0}
        width={{ base: '70px', sm: '240px' }} // Adjust sidebar width based on screen size
        bg={navBgColor}
        borderRight="1px"
        p={4}
        zIndex={1000}
        display={{ base: "none", md: "block" }}
        
      >
        <VStack spacing={8} align="stretch" height="100%">
          <VStack spacing={2} align="stretch">
            {navItems.map((item) => (
              <NavItemComponent
                key={item.path}
                item={item}
                isActive={location.pathname === item.path}
              />
            ))}
          </VStack>

          <Spacer />

          <VStack spacing={4} align="stretch" width="100%">
            <Button
              leftIcon={<FaSignOutAlt />}
              variant="ghost"
              justifyContent="flex-start"
              width="100%"
              onClick={() => toast({ title: 'Logged out', status: 'info', duration: 2000 })}
            >
              Logout
            </Button>

            {/* Settings Button */}
            <Button
              leftIcon={<Icon as={FaCog} />}
              variant="ghost"
              width="100%"
              justifyContent="flex-start"
              onClick={() => setIsSettingsOpen(true)}
              color={textColor}
              _hover={{ bg: activeBgColor, color: activeTextColor }}
            >
              Settings
            </Button>

            {/* Theme Toggle */}
            <Button
              leftIcon={<Icon as={colorMode === 'light' ? FaMoon : FaSun} />}
              variant="ghost"
              width="100%"
              justifyContent="flex-start"
              onClick={toggleColorMode}
              color={textColor}
              _hover={{ bg: activeBgColor, color: activeTextColor }}
            >
              {colorMode === 'light' ? 'Dark Mode' : 'Light Mode'}
            </Button>
          </VStack>
        </VStack>
      </Box>
    </>
  );
};

export default Navigation;
