import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    background: {
      light: '#FFFFFF',
      dark: '#607D8B',
    },
    sidePanel: {
      background: `#607D8B`,
      hoverItemBackground: `#455A64`,
      activeItemBackground: `#90A4AE`,
      text: '#FFFFFF',
      textHover: '#c2ddff',
    },
    page: {
      background: '#FFFFFF',
      sidePanelBackground: `#607D8B`,
      sidePanelHoverItemBackground: `#90A4AE`,
      sidePanelActiveItemBackground: `#455A64`,
      text: '#FFFFFF',
      textDark: '#08101C',
    },
    primary: {
      light: '#DDEAF3',
      dark: '#47687F',
    },
    secondary: {
      light: '#6A7F8C',
      dark: '#3E5360',
    },
    tertiary: {
      light: '#B3C5D3',
      dark: '#2F414C',
    },
    textPrimary: {
      light: '#F5F5F5',
      dark: '#08101C',
    },
    textSecondary: {
      light: '#7F9CAE',
      dark: '#1A2834',
    },
    accent: {
      light: '#79AAFF',
      dark: '#265D9F',
      darker: '#134782',
    },
    button: {
      hover: '#1262A3',
      light: '#2675BF',
      dark: '#105287',
    },
    buttonTwo: {
      hover: '#3B4D57',
      light: '#507387',
      dark: '#2B3642',
    },
    loginWithGoogle: {
      hover: '#9A3312',
      light: '#BF4236',
      dark: '#881C1A',
    },
    error: {
      light: '#D33A34',
      dark: '#9E2023',
    },
    link: {
      hover: '#8C8C8C',
      light: '#D6D6D6',
      dark: '#495F6C',
    },
    formLabel: {
      light: '#7E99A7',
      dark: '#3B4D57',
    },
    chatSection: {
      light: '#FFFFFF',
      dark: '#d9edfa',
      arrow: '#304B57',
      hover: '#c5ebfd',
    },
    neutral: {
      light: '#7F9CAE',
      dark: '#2E404C',
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
