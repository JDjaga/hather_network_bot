import React from 'react';
import { Box, BoxProps } from '@chakra-ui/react';
import { motion } from 'framer-motion';

interface GlowBoxProps extends BoxProps {
  glowColor?: string;
  glowIntensity?: number;
  children: React.ReactNode;
  as?: React.ElementType;
  size?: string;
  colorScheme?: string;
  onClick?: () => void;
}

const MotionBox = motion(Box);

const GlowBox: React.FC<GlowBoxProps> = ({
  children,
  glowColor = "brand.500",
  glowIntensity = 0.5,
  as: Component = Box,
  ...props
}) => {
  return (
    <MotionBox
      as={Component}
      initial={{
        boxShadow: `0 0 0px ${glowColor}`,
        scale: 1,
      }}
      animate={{
        boxShadow: `0 0 ${20 * glowIntensity}px ${glowColor}`,
        scale: 1,
      }}
      whileHover={{
        boxShadow: `0 0 ${40 * glowIntensity}px ${glowColor}`,
        scale: 1.05,
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </MotionBox>
  );
};

export default GlowBox; 