import React from 'react';
import {
  Box,
  Text,
  VStack,
  HStack,
  Icon,
  useColorModeValue,
  useToast,
  Heading,
  Switch,
  Select,
  Divider,
  Button,
  Tooltip,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import {
  FaSun,
  FaMoon,
  FaPalette,
  FaLanguage,
  FaBell,
  FaShieldAlt,
  FaUserCog,
  FaWallet,
  FaChartLine,
} from 'react-icons/fa';

const MotionBox = motion(Box);

interface ThemeSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  onThemeChange: (theme: string) => void;
  onLanguageChange: (language: string) => void;
}

const ThemeSettings: React.FC<ThemeSettingsProps> = ({
  isOpen,
  onClose,
  onThemeChange,
  onLanguageChange,
}) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const toast = useToast();

  const [notifications, setNotifications] = React.useState(true);
  const [autoLock, setAutoLock] = React.useState(false);
  const [gasOptimization, setGasOptimization] = React.useState(true);
  const [currency, setCurrency] = React.useState('USD');

  const handleThemeChange = (theme: string) => {
    onThemeChange(theme);
    toast({
      title: 'Theme Updated',
      description: `Switched to ${theme} theme`,
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  const handleLanguageChange = (language: string) => {
    onLanguageChange(language);
    toast({
      title: 'Language Updated',
      description: `Switched to ${language}`,
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  const handleSettingChange = (setting: string, value: boolean | string) => {
    toast({
      title: 'Setting Updated',
      description: `${setting} has been ${typeof value === 'boolean' ? (value ? 'enabled' : 'disabled') : `set to ${value}`}`,
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent
        as={MotionBox}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        bg={bgColor}
        borderRadius="xl"
        borderWidth="1px"
        borderColor={borderColor}
        boxShadow="xl"
      >
        <ModalHeader>
          <Heading size="lg" bgGradient="linear(to-r, brand.500, blue.500)" bgClip="text">
            Settings
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={6} align="stretch" pb={6}>
            {/* Theme Settings */}
            <Box>
              <HStack mb={4}>
                <Icon as={FaPalette} w={5} h={5} color="brand.500" />
                <Text fontWeight="medium" color={textColor}>Theme</Text>
              </HStack>
              <HStack spacing={4}>
                <Tooltip label="Light Theme">
                  <MotionBox
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleThemeChange('light')}
                    cursor="pointer"
                  >
                    <Box p={4} borderRadius="lg" bg="white" boxShadow="md">
                      <FaSun size={24} color="#FFB800" />
                    </Box>
                  </MotionBox>
                </Tooltip>
                <Tooltip label="Dark Theme">
                  <MotionBox
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleThemeChange('dark')}
                    cursor="pointer"
                  >
                    <Box p={4} borderRadius="lg" bg="gray.800" boxShadow="md">
                      <FaMoon size={24} color="#805AD5" />
                    </Box>
                  </MotionBox>
                </Tooltip>
              </HStack>
            </Box>

            <Divider />

            {/* Language Settings */}
            <Box>
              <HStack mb={4}>
                <Icon as={FaLanguage} w={5} h={5} color="brand.500" />
                <Text fontWeight="medium" color={textColor}>Language</Text>
              </HStack>
              <Select
                value="English"
                onChange={(e) => handleLanguageChange(e.target.value)}
                bg={bgColor}
                borderColor={borderColor}
              >
                <option value="English">English</option>
                <option value="Spanish">Español</option>
                <option value="French">Français</option>
                <option value="German">Deutsch</option>
                <option value="Japanese">日本語</option>
              </Select>
            </Box>

            <Divider />

            {/* Notification Settings */}
            <Box>
              <HStack mb={4}>
                <Icon as={FaBell} w={5} h={5} color="brand.500" />
                <Text fontWeight="medium" color={textColor}>Notifications</Text>
              </HStack>
              <VStack align="stretch" spacing={3}>
                <HStack justify="space-between">
                  <Text>Enable Notifications</Text>
                  <Switch
                    isChecked={notifications}
                    onChange={(e) => {
                      setNotifications(e.target.checked);
                      handleSettingChange('Notifications', e.target.checked);
                    }}
                    colorScheme="brand"
                  />
                </HStack>
              </VStack>
            </Box>

            <Divider />

            {/* Security Settings */}
            <Box>
              <HStack mb={4}>
                <Icon as={FaShieldAlt} w={5} h={5} color="brand.500" />
                <Text fontWeight="medium" color={textColor}>Security</Text>
              </HStack>
              <VStack align="stretch" spacing={3}>
                <HStack justify="space-between">
                  <Text>Auto-lock Wallet</Text>
                  <Switch
                    isChecked={autoLock}
                    onChange={(e) => {
                      setAutoLock(e.target.checked);
                      handleSettingChange('Auto-lock', e.target.checked);
                    }}
                    colorScheme="brand"
                  />
                </HStack>
              </VStack>
            </Box>

            <Divider />

            {/* Transaction Settings */}
            <Box>
              <HStack mb={4}>
                <Icon as={FaChartLine} w={5} h={5} color="brand.500" />
                <Text fontWeight="medium" color={textColor}>Transaction Settings</Text>
              </HStack>
              <VStack align="stretch" spacing={3}>
                <HStack justify="space-between">
                  <Text>Gas Optimization</Text>
                  <Switch
                    isChecked={gasOptimization}
                    onChange={(e) => {
                      setGasOptimization(e.target.checked);
                      handleSettingChange('Gas Optimization', e.target.checked);
                    }}
                    colorScheme="brand"
                  />
                </HStack>
                <HStack justify="space-between">
                  <Text>Display Currency</Text>
                  <Select
                    value={currency}
                    onChange={(e) => {
                      setCurrency(e.target.value);
                      handleSettingChange('Currency', e.target.value);
                    }}
                    width="120px"
                    size="sm"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="JPY">JPY</option>
                  </Select>
                </HStack>
              </VStack>
            </Box>

            <Divider />

            {/* Profile Settings */}
            <Box>
              <HStack mb={4}>
                <Icon as={FaUserCog} w={5} h={5} color="brand.500" />
                <Text fontWeight="medium" color={textColor}>Profile Settings</Text>
              </HStack>
              <Button
                leftIcon={<FaWallet />}
                colorScheme="brand"
                variant="outline"
                size="sm"
                onClick={() => {
                  toast({
                    title: 'Coming Soon',
                    description: 'Profile settings will be available in the next update',
                    status: 'info',
                    duration: 3000,
                    isClosable: true,
                  });
                }}
              >
                Manage Profile
              </Button>
            </Box>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ThemeSettings; 