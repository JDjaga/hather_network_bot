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
  Switch,
  useToast,
  Spinner,
  Flex,
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  TagCloseButton,
  Collapse,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBell, FaTelegram, FaCog, FaTrash, FaEdit, FaCheck, FaTimes, FaExclamationTriangle, FaChartLine, FaTicketAlt, FaCalendarAlt } from 'react-icons/fa';

const MotionBox = motion(Box);

interface Notification {
  id: string;
  type: 'price_alert' | 'event_reminder' | 'telegram_message' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
  source?: string;
  data?: {
    price?: number;
    threshold?: number;
    eventDate?: string;
    eventName?: string;
    telegramChat?: string;
  };
}

interface AlertSettings {
  priceAlerts: boolean;
  eventReminders: boolean;
  telegramMessages: boolean;
  systemNotifications: boolean;
  priceThreshold: number;
  reminderTime: number; // minutes before event
}

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'price_alert',
      title: 'Price Drop Alert',
      message: 'The price of Bored Ape #1234 has dropped below your threshold of $100,000',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      read: false,
      priority: 'high',
      data: {
        price: 95000,
        threshold: 100000,
      },
    },
    {
      id: '2',
      type: 'event_reminder',
      title: 'Upcoming Event',
      message: 'Crypto Conference 2023 starts in 24 hours',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      read: false,
      priority: 'medium',
      data: {
        eventDate: '2023-12-15',
        eventName: 'Crypto Conference 2023',
      },
    },
    {
      id: '3',
      type: 'telegram_message',
      title: 'New Message from Bot',
      message: 'New NFT collection "Digital Dreams" has been listed',
      timestamp: new Date(Date.now() - 10800000).toISOString(),
      read: true,
      priority: 'low',
      data: {
        telegramChat: 'NFT Alerts',
      },
    },
  ]);

  const [settings, setSettings] = useState<AlertSettings>({
    priceAlerts: true,
    eventReminders: true,
    telegramMessages: true,
    systemNotifications: true,
    priceThreshold: 100000,
    reminderTime: 24,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const toast = useToast();

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const cardBgColor = useColorModeValue('gray.50', 'gray.700');
  const hoverBgColor = useColorModeValue('gray.100', 'gray.600');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'red';
      case 'medium':
        return 'orange';
      case 'low':
        return 'green';
      default:
        return 'gray';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'price_alert':
        return FaChartLine;
      case 'event_reminder':
        return FaCalendarAlt;
      case 'telegram_message':
        return FaTelegram;
      case 'system':
        return FaCog;
      default:
        return FaBell;
    }
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const handleDelete = (id: string) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
    toast({
      title: 'Notification deleted',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
    setIsEditing(true);
  };

  const handleSaveEdit = (id: string, updatedNotification: Partial<Notification>) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, ...updatedNotification } : notification
    ));
    setIsEditing(false);
    setEditingId(null);
    toast({
      title: 'Notification updated',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingId(null);
  };

  const handleSettingChange = (setting: keyof AlertSettings, value: any) => {
    setSettings({ ...settings, [setting]: value });
    toast({
      title: 'Settings updated',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
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
    >
      <HStack mb={4} justify="space-between">
        <HStack>
          <Icon as={FaBell} w={6} h={6} color="brand.500" />
          <Text fontSize="xl" fontWeight="bold">
            Notifications
          </Text>
        </HStack>
        <HStack spacing={4}>
          <Button
            leftIcon={<FaCog />}
            variant="ghost"
            onClick={() => setShowSettings(!showSettings)}
          >
            Settings
          </Button>
          <Badge colorScheme="brand">
            {notifications.filter(n => !n.read).length} unread
          </Badge>
        </HStack>
      </HStack>

      <Collapse in={showSettings}>
        <Box p={4} bg={cardBgColor} borderRadius="lg" mb={4}>
          <VStack spacing={4} align="stretch">
            <FormControl display="flex" alignItems="center">
              <FormLabel mb="0">Price Alerts</FormLabel>
              <Switch
                isChecked={settings.priceAlerts}
                onChange={(e) => handleSettingChange('priceAlerts', e.target.checked)}
                colorScheme="brand"
              />
            </FormControl>
            <FormControl display="flex" alignItems="center">
              <FormLabel mb="0">Event Reminders</FormLabel>
              <Switch
                isChecked={settings.eventReminders}
                onChange={(e) => handleSettingChange('eventReminders', e.target.checked)}
                colorScheme="brand"
              />
            </FormControl>
            <FormControl display="flex" alignItems="center">
              <FormLabel mb="0">Telegram Messages</FormLabel>
              <Switch
                isChecked={settings.telegramMessages}
                onChange={(e) => handleSettingChange('telegramMessages', e.target.checked)}
                colorScheme="brand"
              />
            </FormControl>
            <FormControl display="flex" alignItems="center">
              <FormLabel mb="0">System Notifications</FormLabel>
              <Switch
                isChecked={settings.systemNotifications}
                onChange={(e) => handleSettingChange('systemNotifications', e.target.checked)}
                colorScheme="brand"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Price Alert Threshold ($)</FormLabel>
              <NumberInput
                value={settings.priceThreshold}
                onChange={(value) => handleSettingChange('priceThreshold', parseInt(value))}
                min={0}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl>
              <FormLabel>Event Reminder Time (hours before)</FormLabel>
              <NumberInput
                value={settings.reminderTime}
                onChange={(value) => handleSettingChange('reminderTime', parseInt(value))}
                min={1}
                max={72}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </VStack>
        </Box>
      </Collapse>

      <VStack spacing={4} align="stretch">
        <AnimatePresence>
          {notifications.map((notification) => (
            <MotionBox
              key={notification.id}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              p={4}
              bg={notification.read ? cardBgColor : 'brand.50'}
              borderRadius="lg"
              borderLeft="4px solid"
              borderLeftColor={`${getPriorityColor(notification.priority)}.500`}
              whileHover={{ 
                scale: 1.01,
                bg: hoverBgColor,
                transition: { duration: 0.2 }
              }}
            >
              {editingId === notification.id ? (
                <VStack spacing={3} align="stretch">
                  <Input
                    value={notification.title}
                    onChange={(e) => handleSaveEdit(notification.id, { title: e.target.value })}
                  />
                  <Input
                    value={notification.message}
                    onChange={(e) => handleSaveEdit(notification.id, { message: e.target.value })}
                  />
                  <Select
                    value={notification.priority}
                    onChange={(e) => handleSaveEdit(notification.id, { priority: e.target.value as 'low' | 'medium' | 'high' })}
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </Select>
                  <HStack spacing={2} justify="flex-end">
                    <Button
                      size="sm"
                      colorScheme="brand"
                      onClick={() => handleSaveEdit(notification.id, {})}
                    >
                      <Icon as={FaCheck} mr={2} />
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={handleCancelEdit}
                    >
                      <Icon as={FaTimes} mr={2} />
                      Cancel
                    </Button>
                  </HStack>
                </VStack>
              ) : (
                <>
                  <HStack spacing={3} align="start">
                    <Icon
                      as={getTypeIcon(notification.type)}
                      w={5}
                      h={5}
                      color={`${getPriorityColor(notification.priority)}.500`}
                    />
                    <VStack align="start" spacing={1} flex={1}>
                      <HStack justify="space-between" width="100%">
                        <Text fontWeight="bold">{notification.title}</Text>
                        <Badge colorScheme={getPriorityColor(notification.priority)}>
                          {notification.priority}
                        </Badge>
                      </HStack>
                      <Text fontSize="sm">{notification.message}</Text>
                      {notification.data?.price && (
                        <Text fontSize="sm" color="brand.500">
                          Current Price: ${notification.data.price.toLocaleString()}
                        </Text>
                      )}
                      {notification.data?.eventDate && (
                        <Text fontSize="sm" color="gray.500">
                          <Icon as={FaCalendarAlt} mr={1} />
                          {new Date(notification.data.eventDate).toLocaleDateString()}
                        </Text>
                      )}
                      <Text fontSize="xs" color="gray.500">
                        {new Date(notification.timestamp).toLocaleString()}
                      </Text>
                    </VStack>
                  </HStack>
                  <HStack spacing={2} mt={2} justify="flex-end">
                    {!notification.read && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleMarkAsRead(notification.id)}
                      >
                        Mark as Read
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEdit(notification.id)}
                    >
                      <Icon as={FaEdit} />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      colorScheme="red"
                      onClick={() => handleDelete(notification.id)}
                    >
                      <Icon as={FaTrash} />
                    </Button>
                  </HStack>
                </>
              )}
            </MotionBox>
          ))}
        </AnimatePresence>
      </VStack>
    </MotionBox>
  );
};

export default Notifications; 