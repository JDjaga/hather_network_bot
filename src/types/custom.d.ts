import { IconType } from 'react-icons';
import { ElementType, ReactNode, ComponentType, SVGProps } from 'react';
import { ChakraProps, ComponentWithAs, ResponsiveValue, ButtonProps } from '@chakra-ui/react';
import { HTMLMotionProps, TargetAndTransition } from 'framer-motion';

declare module '@chakra-ui/react' {
  interface IconProps {
    as?: IconType | ComponentType<SVGProps<SVGSVGElement>> | string;
    w?: string | number;
    h?: string | number;
    color?: string;
    mb?: string | number;
    mr?: string | number;
  }

  interface ButtonProps {
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    size?: string;
  }

  interface BoxProps {
    variants?: any;
    whileHover?: TargetAndTransition;
    whileTap?: TargetAndTransition;
    initial?: TargetAndTransition;
    animate?: TargetAndTransition;
    exit?: TargetAndTransition;
    transition?: any;
  }

  interface AvatarProps {
    icon?: ReactNode;
  }

  interface MotionProps {
    bg?: ResponsiveValue<string>;
    size?: ResponsiveValue<string>;
  }
}

declare module 'framer-motion' {
  interface AnimatePresenceProps {
    children?: ReactNode;
  }

  interface MotionProps {
    bg?: string;
    size?: string;
  }
}

export interface GlowBoxProps extends ChakraProps, HTMLMotionProps<'div'> {
  glowColor?: string;
  glowIntensity?: number;
  as?: ComponentWithAs<any, any>;
  variants?: any;
  whileHover?: TargetAndTransition;
  whileTap?: TargetAndTransition;
  initial?: TargetAndTransition;
  animate?: TargetAndTransition;
  exit?: TargetAndTransition;
  transition?: any;
  size?: string;
  w?: string;
  colorScheme?: string;
  onClick?: () => void;
}

export interface CustomIconProps {
  as?: IconType | ComponentType<SVGProps<SVGSVGElement>> | string;
  color?: string;
  w?: string | number;
  h?: string | number;
  mr?: string | number;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
} 