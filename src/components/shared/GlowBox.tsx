import React from 'react';
import { Box, BoxProps, Button, ButtonProps, ComponentWithAs } from '@chakra-ui/react';
import { motion, MotionProps, HTMLMotionProps } from 'framer-motion';

type Merge<P, T> = Omit<P, keyof T> & T;
type MotionBoxProps = Merge<BoxProps, HTMLMotionProps<'div'>>;
const MotionBox = motion(Box) as React.ComponentType<MotionBoxProps>;

interface GlowBoxProps extends Omit<MotionBoxProps, 'as'> {
  children: React.ReactNode;
  glowColor?: string;
  glowIntensity?: number;
  as?: ComponentWithAs<any, any>;
}

type GlowBoxButtonProps = GlowBoxProps & ButtonProps;

const GlowBox: React.FC<GlowBoxButtonProps> = ({ 
  children, 
  glowColor = 'var(--chakra-colors-brand-500)',
  glowIntensity = 1,
  as,
  ...props 
}) => {
  const getGlowEffect = (intensity: number = 1) => {
    return `0 0 ${20 * intensity}px ${glowColor}, 0 0 ${40 * intensity}px rgba(49, 130, 206, 0.3)`;
  };

  const motionProps: MotionProps = {
    initial: { 
      opacity: 0,
      y: 20,
      boxShadow: "0 0 0px rgba(0,0,0,0)" 
    },
    animate: { 
      opacity: 1,
      y: 0,
      boxShadow: getGlowEffect(glowIntensity),
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    whileHover: { 
      scale: 1.02,
      boxShadow: getGlowEffect(glowIntensity * 1.5),
      transition: {
        duration: 0.2
      }
    }
  };

  const Component = as || Box;

  return (
    <MotionBox
      as={Component}
      {...motionProps}
      {...(props as MotionBoxProps)}
    >
      {children}
    </MotionBox>
  );
};

export default GlowBox; 