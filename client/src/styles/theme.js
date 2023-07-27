import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    background: {
      light: '#8C9EA6',
      dark: '#344955',
    },
    primary: {
      light: '#FFFFFF',
      dark: '#455A64',
    },
    secondary: {
      light: '#7A8F9C',
      dark: '#546E7A',
    },
    tertiary: {
      light: '#CFD8DC',
      dark: '#455A64',
    },
    textPrimary: {
      light: '#FFFFFF',
      dark: '#000000',
    },
    textSecondary: {
      light: '#AEBDC2',
      dark: '#263238',
    },
    accent: {
      light: '#80B4FF',
      dark: '#528FF5',
    },
    button: {
      hover: '#1A76B4',
      light: '#4193E0',
      dark: '#1669C1',
    },
    buttonTwo: {
      hover: '#546E7A',
      light: '#748F9C',
      dark: '#344955',
    },
    loginWithGoogle: {
      hover: '#D84315',
      light: '#EF5350',
      dark: '#B71C1C',
    },
    error: {
      light: '#f44336',
      dark: '#d32f2f',
    },
    link: {
      hover: '#BDBDBD',
      light: '#FFFFFF',
      dark: '#78909C',
    },
    formLabel: {
      light: '#AEBDC2',
      dark: '#546E7A',
    },
    chatSection: {
      light: '#949fa2',
      dark: '#546E7A',
    },
    neutral: {
      light: '#AEBDC2',
      dark: '#455A64',
    },
  },
  styles: {
    global: {
      body: {
        color: 'textSecondary.light',
        bg: 'background.light',
      },
    },
  },
});

export default theme;
