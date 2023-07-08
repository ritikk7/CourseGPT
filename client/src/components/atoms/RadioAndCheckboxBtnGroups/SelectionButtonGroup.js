import { Box, useCheckbox, useRadio } from '@chakra-ui/react';

// A button group that allow multiselect
export function MultiSelectButtons(props) {
  const { getCheckboxProps, getInputProps } = useCheckbox(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label" w="100%">
      <input {...input} hidden />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        color="white"
        _checked={{
          bg: 'teal.600',
          color: 'white',
          borderColor: 'teal.600',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        _hover={{
          background: 'teal.500',
          color: 'white',
        }}
        px={5}
        py={3}
        align="center"
        fontWeight={'bold'}
        my="10px"
      >
        {props.children}
      </Box>
    </Box>
  );
}

// A button group that allow single select
export function SingleSelectButtons(props) {
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const radiobtns = getRadioProps();

  return (
    <Box as="label" w="100%">
      <input {...input} />
      <Box
        {...radiobtns}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        color="white"
        _checked={{
          bg: 'teal.600',
          color: 'white',
          borderColor: 'teal.600',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        _hover={{
          background: 'teal.500',
          color: 'white',
        }}
        px={5}
        py={3}
        align="center"
        fontWeight={'bold'}
        my="10px"
      >
        {props.children}
      </Box>
    </Box>
  );
}
