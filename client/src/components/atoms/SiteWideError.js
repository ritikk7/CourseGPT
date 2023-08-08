import React from 'react';
import { Alert, Flex, useTheme, Box } from '@chakra-ui/react';

const SiteWideError = () => {
  const theme = useTheme();
  return (
    <Flex
      width="100%"
      height="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Box width="50%">
        <Alert
          status="error"
          mb={5}
          bg={theme.colors.error.light}
          color={theme.colors.button.text}
          borderRadius="md"
          padding={4}
          fontSize="lg"
        >
          We encountered an error. Please refresh the page and try again.
        </Alert>
      </Box>
    </Flex>
  );
};

export default SiteWideError;
