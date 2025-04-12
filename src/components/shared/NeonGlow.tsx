import React from 'react';
import { Box, BoxProps, useColorModeValue } from '@chakra-ui/react';
import { motion, MotionProps, Variants, HTMLMotionProps } from 'framer-motion';

type Merge<P, T> = Omit<P, keyof T> & T;
type MotionBoxProps = Merge<BoxProps, HTMLMotionProps<'div'>>;
const MotionBox = motion(Box) as React.ComponentType<MotionBoxProps>;

interface NeonGlowProps extends Omit<MotionBoxProps, keyof MotionProps> {
  children: React.ReactNode;
  color?: string;
  intensity?: number;
}

const NeonGlow: React.FC<NeonGlowProps> = ({ 
  children, 
  color = 'var(--chakra-colors-brand-500)',
  intensity = 1,
  ...props 
}) => {
  const glowVariants: Variants = {
    initial: {
      opacity: 0.8,
      boxShadow: `0 0 10px ${color}`
    },
    animate: {
      opacity: [0.8, 1, 0.8],
      boxShadow: [
        `0 0 ${10 * intensity}px ${color}`,
        `0 0 ${20 * intensity}px ${color}`,
        `0 0 ${10 * intensity}px ${color}`
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const motionProps: MotionProps = {
    initial: "initial",
    animate: "animate",
    variants: glowVariants
  };

  return (
    <MotionBox
      position="relative"
      {...motionProps}
      {...(props as MotionBoxProps)}
      sx={{
        '&::before': {
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
          animation: 'pulse 2s infinite'
        },
        '&::after': {
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
          animation: 'pulse 2s infinite 1s'
        },
        '@keyframes pulse': {
          '0%': { opacity: 0.5 },
          '50%': { opacity: 0.8 },
          '100%': { opacity: 0.5 }
        }
      }}
    >
      {children}
    </MotionBox>
  );
};

export default NeonGlow; 