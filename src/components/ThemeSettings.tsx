import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Switch,
  Select,
  FormControl,
  FormLabel,
  useColorMode,
  useColorModeValue,
  Button,
  Divider,
  Icon,
  useToast,
  Radio,
  RadioGroup,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from '@chakra-ui/react';
import { FaPalette, FaBell, FaDesktop, FaLanguage, FaMoon, FaSun, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

interface ThemeSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

const ThemeSettings: React.FC<ThemeSettingsProps> = ({ isOpen, onClose }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [language, setLanguage] = useState('en');
  const [fontSize, setFontSize] = useState(16);
  const [neonIntensity, setNeonIntensity] = useState(50);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const toast = useToast();

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const cardBgColor = useColorModeValue('gray.50', 'gray.700');

  const handleSave = () => {
    // Save settings to localStorage
    localStorage.setItem('themeSettings', JSON.stringify({
      language,
      fontSize,
      neonIntensity,
      animationsEnabled,
    }));

    toast({
      title: 'Settings saved',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box
      position="fixed"
      top={0}
      right={0}
      bottom={0}
      width="400px"
      bg={bgColor}
      borderLeft="1px"
      borderColor={borderColor}
      p={4}
      overflowY="auto"
      zIndex={1001}
      display={isOpen ? 'block' : 'none'}
    >
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        p={6}
        bg={bgColor}
        borderRadius="xl"
        borderWidth="1px"
        borderColor={borderColor}
        boxShadow="lg"
      >
        <VStack spacing={6} align="stretch">
          <HStack justify="space-between">
            <HStack>
              <Icon as={FaPalette} w={6} h={6} color="brand.500" />
              <Text fontSize="xl" fontWeight="bold">
                Theme Settings
              </Text>
            </HStack>
            <HStack spacing={2}>
              <Button
                size="sm"
                colorScheme="brand"
                onClick={handleSave}
              >
                Save Changes
              </Button>
              <Button
                size="sm"
                variant="outline"
                colorScheme="red"
                onClick={onClose}
                leftIcon={<Icon as={FaTimes} />}
              >
                
              </Button>
            </HStack>
          </HStack>

          <Divider />

          {/* Color Mode */}
          <FormControl display="flex" alignItems="center">
            <FormLabel mb="0">
              <HStack>
                <Icon as={colorMode === 'dark' ? FaMoon : FaSun} />
                <Text>Dark Mode</Text>
              </HStack>
            </FormLabel>
            <Switch
              isChecked={colorMode === 'dark'}
              onChange={toggleColorMode}
              colorScheme="brand"
            />
          </FormControl>

          {/* Language Settings */}
          <FormControl>
            <FormLabel>
              <HStack>
                <Icon as={FaLanguage} />
                <Text>Language</Text>
              </HStack>
            </FormLabel>
            <Select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="zh">中文</option>
            </Select>
          </FormControl>

          {/* Font Size */}
          <FormControl>
            <FormLabel>
              <HStack>
                <Icon as={FaDesktop} />
                <Text>Font Size</Text>
              </HStack>
            </FormLabel>
            <Slider
              value={fontSize}
              onChange={setFontSize}
              min={12}
              max={24}
              step={1}
            >
              <SliderMark value={12}>12</SliderMark>
              <SliderMark value={18}>18</SliderMark>
              <SliderMark value={24}>24</SliderMark>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </FormControl>

          {/* Neon Effect Intensity */}
          <FormControl>
            <FormLabel>
              <HStack>
                <Icon as={FaPalette} />
                <Text>Neon Effect Intensity</Text>
              </HStack>
            </FormLabel>
            <Slider
              value={neonIntensity}
              onChange={setNeonIntensity}
              min={0}
              max={100}
              step={10}
            >
              <SliderMark value={0}>Off</SliderMark>
              <SliderMark value={50}>50%</SliderMark>
              <SliderMark value={100}>100%</SliderMark>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </FormControl>

          {/* Animations */}
          <FormControl display="flex" alignItems="center">
            <FormLabel mb="0">
              <HStack>
                <Icon as={FaDesktop} />
                <Text>Enable Animations</Text>
              </HStack>
            </FormLabel>
            <Switch
              isChecked={animationsEnabled}
              onChange={(e) => setAnimationsEnabled(e.target.checked)}
              colorScheme="brand"
            />
          </FormControl>

          {/* Display Preferences */}
          <FormControl>
            <FormLabel>
              <HStack>
                <Icon as={FaDesktop} />
                <Text>Display Density</Text>
              </HStack>
            </FormLabel>
            <RadioGroup defaultValue="comfortable">
              <VStack align="start">
                <Radio value="compact">Compact</Radio>
                <Radio value="comfortable">Comfortable</Radio>
                <Radio value="spacious">Spacious</Radio>
              </VStack>
            </RadioGroup>
          </FormControl>
        </VStack>
      </MotionBox>
    </Box>
  );
};

export default ThemeSettings; 