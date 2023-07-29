import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    background: {
      light: '#FFFFFF',
      dark: '#1c1c1c',
    },

    profileModal: {
      mainBackground: '#FFFFFF',
      sidePanelInactiveItemBackground: `#90A4AE`,
      sidePanelHoverItemBackground: `#607D8B`,
      sidePanelActiveItemBackground: `#455A64`,
      sidePanelIconColor: '#FFFFFF',
      hoverItemBackground: `#455A64`,
      activeItemBackground: `#607D8B`,
      inactiveItemBackground: `#90A4AE`,
      hoverItemText: '#FFFFFF',
      activeItemText: '#FFFFFF',
      inactiveItemText: '#F5F5F5',
      mainTextColor: '#0E1723',
      mainFormLabelColor: '#0E1723',
      mainFormInputColor: '#D9E2E8',
    },
    loginAndReg: {
      mainBackground: '#C4D6DC',
      boxBackground: '#FFFFFF',
      inputBackground: '#f1f7fc',
      text: '#0E1723',
      link: {
        base: '#1A73E8',
        hover: '#1543C4',
      },
      loginWithGoogleButton: {
        base: '#ff6b6b',
        hover: '#ff4a4a',
      },
      loginOrRegisterButton: {
        base: '#5791ff',
        hover: '#2b75ff',
      },
      icon: '#0E1723',
    },
    icon: '#455A64',
    primary: {
      light: '#DDEAF3',
      dark: '#47687F',
    },
    secondary: {
      light: '#6A7F8C',
      dark: '#3F5761',
    },
    tertiary: {
      light: '#B3C5D3',
      dark: '#2F414C',
    },
    textPrimary: {
      light: '#FFFFFF',
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
      text: '#FFFFFF',
      hover: '#1262A3',
      light: '#2675BF',
      dark: '#105287',
    },
    buttonCancel: {
      text: '#FFFFFF',
      hover: '#9E2023',
      light: '#D33A34',
      dark: '#2B3642',
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
    sidePanel: {
      background: `#607d8b`,
      hoverItemBackground: `#48606c`,
      activeItemBackground: `#455a64`,
      text: '#F5F6F8',
      textHover: '#D8E0E5',
    },

    chatSection: {
      dark: '#d1dbde',  // background for message from chat gpt (dark background)
      lightText: '#09111e',  // text for dark background
      light: '#ffffff',  // background for message from user (light background)
      darkText: '#09111e',  // text for light background
      sendArrow: '#ffffff',  // send arrow inside input box
      inputBackground: '#738389',  // background for user input box
      inputText: '#ffffff',  // text for user input box
      icon: '#455a64',  // icon color for feedback on top of dark background
    },

    neutral: {
      light: '#7F9CAE',
      dark: '#2E404C',
    },
    mainInput: '#738389',
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
