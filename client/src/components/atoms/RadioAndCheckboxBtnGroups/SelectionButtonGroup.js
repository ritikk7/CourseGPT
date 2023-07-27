import { Box, useCheckbox, useRadio, useTheme } from '@chakra-ui/react';

// A button group that allows multiselect
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
        color={theme.colors.profileModal.inactiveItemText}
        bg={theme.colors.profileModal.inactiveItemBackground}
        _checked={{
          bg: theme.colors.profileModal.activeItemBackground,
          color: theme.colors.profileModal.activeItemText,
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        _hover={{
          bg: theme.colors.profileModal.hoverItemBackground,
          color: theme.colors.profileModal.hoverItemText,
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

// A button group that allows single select
export function SingleSelectButtons(props) {
  const { getInputProps, getRadioProps } = useRadio(props);

  const theme = useTheme();
  const input = getInputProps();
  const radio = getRadioProps();

  return (
    <Box as="label" w="100%">
      <input {...input} />
      <Box
        bg={theme.colors.profileModal.inactiveItemBackground}
        {...radio}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        color={theme.colors.profileModal.inactiveItemText}
        _checked={{
          bg: theme.colors.profileModal.activeItemBackground,
          color: theme.colors.profileModal.activeItemText,
          borderColor: theme.colors.profileModal.activeItemBackground,
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        _hover={{
          bg: theme.colors.profileModal.hoverItemBackground,
          color: theme.colors.profileModal.hoverItemText,
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
