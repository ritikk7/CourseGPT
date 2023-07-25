import { Box, useCheckbox, useRadio, useTheme } from '@chakra-ui/react';

// A button group that allow multiselect
export function MultiSelectButtons(props) {
  const { getCheckboxProps, getInputProps } = useCheckbox(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  const theme = useTheme();
  return (
    <Box as="label" w="100%">
      <input {...input} hidden />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        color={theme.colors.button.textBase}
        bg={theme.colors.primary.light}
        _checked={{
          bg: theme.colors.button.hover,
          color: theme.colors.button.textHover,
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        _hover={{
          bg: theme.colors.button.hover,
          color: theme.colors.button.textHover,
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
  const theme = useTheme();
  const input = getInputProps();
  const radiobtns = getRadioProps();

  return (
    <Box as="label" w="100%">
      <input {...input} />
      <Box
        bg={theme.colors.primary.light}
        {...radiobtns}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        color={theme.colors.button.textBase}
        _checked={{
          bg: theme.colors.button.light,
          color: theme.colors.button.textBase,
          borderColor: theme.colors.button.light,
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        _hover={{
          bg: theme.colors.button.hover,
          color: theme.colors.button.textHover,
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
