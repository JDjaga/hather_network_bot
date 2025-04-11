import React from 'react';
import { Box, BoxProps } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

interface GlowBoxProps extends BoxProps {
  glowColor?: string;
  glowIntensity?: number;
}

const GlowBox = ({ children, glowColor = 'brand.500', glowIntensity = 0.5, ...props }: GlowBoxProps) => (
  <MotionBox
    initial={{ boxShadow: `0 0 0px ${glowColor}` }}
    animate={{
      boxShadow: [
        `0 0 10px ${glowColor}`,
        `0 0 20px ${glowColor}`,
        `0 0 10px ${glowColor}`
      ]
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    whileHover={{
      boxShadow: `0 0 30px ${glowColor}, 0 0 50px rgba(49, 130, 206, 0.3)`,
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10,
        boxShadow: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: 2
        }
      }
    }}
    {...props}
  >
    {children}
  </MotionBox>
);

export default GlowBox; 