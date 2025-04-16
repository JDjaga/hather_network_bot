import { extendTheme, type ThemeConfig, theme as baseTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const theme = extendTheme(
  {
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
      heading: `'Inter', ${baseTheme.fonts?.heading}`,
      body: `'Inter', ${baseTheme.fonts?.body}`,
    },
    fontSizes: {
      xs: "0.75rem",  // 12px
      sm: "0.875rem", // 14px
      md: "1rem",     // 16px
      lg: "1.125rem", // 18px
      xl: "1.25rem",  // 20px
      "2xl": "1.5rem",// 24px
      "3xl": "1.875rem", // 30px
      "4xl": "2.25rem",  // 36px
      "5xl": "3rem",     // 48px
      "6xl": "3.75rem",  // 60px
    },  
    styles: {
      global: (props) => ({
        html: {
          height: '100%',
        },
        body: {
          height: '100%',
          bg: mode('white', 'gray.900')(props),
          color: mode('gray.800', 'white')(props),
          margin: 0,
          padding: 0,
        },
        '#root': {
          minHeight: '100vh',
          bg: mode('white', 'gray.900')(props),
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
          solid: (props) => ({
            bg: mode('brand.500', 'brand.500')(props),
            color: 'white',
            _hover: {
              bg: mode('brand.600', 'brand.400')(props),
            },
          }),
        },
      },
      Card: {
        baseStyle: (props) => ({
          container: {
            bg: mode('white', 'gray.800')(props),
            borderRadius: 'xl',
            boxShadow: mode(
              '0 0 20px rgba(0, 0, 0, 0.1)',
              '0 0 20px rgba(123, 97, 255, 0.2)'
            )(props),
          },
        }),
      },
    },
  },
  baseTheme // 👈 merge with Chakra's default theme
);

export default theme;
