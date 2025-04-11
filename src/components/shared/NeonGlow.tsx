import React from 'react';
import { Box, BoxProps } from '@chakra-ui/react';
import { motion } from 'framer-motion';

interface NeonGlowProps extends Omit<BoxProps, 'transition'> {
  children: React.ReactNode;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
}

const MotionBox = motion(Box);

const NeonGlow = ({ children, color = 'brand.500', size = 'md', ...props }: NeonGlowProps) => {
  const getGlowSize = () => {
    switch (size) {
      case 'sm':
        return '0 0 5px, 0 0 10px';
      case 'md':
        return '0 0 10px, 0 0 20px';
      case 'lg':
        return '0 0 15px, 0 0 30px';
      default:
        return '0 0 10px, 0 0 20px';
    }
  };

  const glowSize = getGlowSize();

  return (
    <MotionBox
      position="relative"
      initial={{ opacity: 0.8 }}
      animate={{ 
        opacity: [0.8, 1, 0.8],
        boxShadow: [
          `${glowSize.split(',')[0]} ${color}`,
          `${glowSize.split(',')[1]} ${color}`,
          `${glowSize.split(',')[0]} ${color}`
        ]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      _before={{
        content: '""',
        position: 'absolute',
        top: '-2px',
        left: '-2px',
        right: '-2px',
        bottom: '-2px',
        background: color,
        filter: 'blur(8px)',
        zIndex: -1,
        opacity: 0.7,
        animation: 'pulse 2s infinite',
      }}
      _after={{
        content: '""',
        position: 'absolute',
        top: '-4px',
        left: '-4px',
        right: '-4px',
        bottom: '-4px',
        background: color,
        filter: 'blur(12px)',
        zIndex: -2,
        opacity: 0.3,
        animation: 'pulse 2s infinite 1s',
      }}
      sx={{
        '@keyframes pulse': {
          '0%': { opacity: 0.5 },
          '50%': { opacity: 0.8 },
          '100%': { opacity: 0.5 },
        }
      }}
      {...props}
    >
      {children}
    </MotionBox>
  );
};

export default NeonGlow; 