import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    background: {
      light: '#FFFFFF',
      dark: '#1c1c1c',
    },

    profileModal: {
      mainBackground: '#FFFFFF',
      sidePanelInactiveItemBackground: `#1F3A60`,
      sidePanelHoverItemBackground: `#336699`,
      sidePanelActiveItemBackground: `#1A243B`,
      sidePanelIconColor: '#FFFFFF',
      hoverItemBackground: `#336699`,
      activeItemBackground: `#1A243B`,
      inactiveItemBackground: `#26487c`,
      hoverItemText: '#FFFFFF',
      activeItemText: '#FFFFFF',
      inactiveItemText: '#eeeeee',
      mainTextColor: '#08101C',
      mainFormLabelColor: '#08101C',
      mainFormInputColor: '#c2dcff',
    },

    loginAndReg: {
      mainBackground: '#c2dcff',
      boxBackground: '#FFFFFF',
      inputBackground: '#FFFFFF',
      text: '#08101C',
      link: {
        base: '#1F3A60',
        hover: '#1A243B',
      },
      loginWithGoogleButton: {
        hover: '#ff3f37',
        base: '#D33A34',
      },
      loginOrRegisterButton: {
        base: '#1F3A60',
        hover: '#3567af',
      },
      icon: '#1F3A60',
    },

    sidePanel: {
      background: `#1F3A60`,
      hoverItemBackground: `#336699`,
      activeItemBackground: `#1A243B`,
      text: '#FFFFFF',
      menuBackground: `#336699`,
      menuTextHover: '#FFFFFF',
      menuText: '#ececec',
    },

    chatSection: {
      dark: '#c2dcff', // background for message from chat gpt (dark background)
      lightText: '#08101C', // text for dark background
      light: '#FFFFFF', // background for message from user (light background)
      darkText: '#08101C', // text for light background
      sendArrow: '#1F3A60', // send arrow inside input box
      inputBackground: '#FFFFFF', // background for user input box
      inputText: '#1F3A60', // text for user input box
      icon: `#1F3A60`, // icon color for feedback on top of dark background
    },

    button: {
      text: '#FFFFFF',
      hover: '#336699',
      light: '#1F3A60',
      dark: '#1A243B',
    },

    buttonCancel: {
      text: '#FFFFFF',
      hover: '#9E2023',
      light: '#D33A34',
      dark: '#1A243B',
    },

    feedbackModal: {
      mainBackground: '#FFFFFF',
    },

    search: {
      highlight: '#EBB810',
    },

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
