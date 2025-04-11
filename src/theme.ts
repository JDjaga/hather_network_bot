import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true,
};

const theme = extendTheme({
  config,
  colors: {
    brand: {
      50: '#f0e4ff',
      100: '#cbb2ff',
      200: '#a480ff',
      300: '#7c4dff',
      400: '#541aff',
      500: '#3b00e6',
      600: '#2e00b4',
      700: '#210082',
      800: '#140051',
      900: '#070021',
    },
  },
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
  },
  styles: {
    global: (props: { colorMode: 'light' | 'dark' }) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.900' : 'white',
        color: props.colorMode === 'dark' ? 'white' : 'gray.800',
      },
    }),
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
        borderRadius: 'lg',
      },
      variants: {
        solid: (props: { colorMode: 'light' | 'dark' }) => ({
          bg: props.colorMode === 'dark' ? 'brand.500' : 'brand.500',
          color: 'white',
          _hover: {
            bg: props.colorMode === 'dark' ? 'brand.400' : 'brand.600',
          },
        }),
      },
    },
    Card: {
      baseStyle: (props: { colorMode: 'light' | 'dark' }) => ({
        container: {
          bg: props.colorMode === 'dark' ? 'gray.800' : 'white',
          borderRadius: 'xl',
          boxShadow: props.colorMode === 'dark' 
            ? '0 0 20px rgba(123, 97, 255, 0.2)' 
            : '0 0 20px rgba(0, 0, 0, 0.1)',
        },
      }),
    },
  },
});

export default theme; 