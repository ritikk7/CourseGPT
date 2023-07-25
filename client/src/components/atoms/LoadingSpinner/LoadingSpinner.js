import React from 'react';
import { Box, Spinner, useTheme } from '@chakra-ui/react';

const LoadingSpinner = () => {
  const theme = useTheme();
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Box>
  );
};

export default LoadingSpinner;
