import {
  Box,
  useCheckbox,
  useRadio,
} from '@chakra-ui/react';

// A button group that allow multiselect
export function MultiSelectButtons(props) {
  const { state, getCheckboxProps, getInputProps, getLabelProps, htmlProps } =
    useCheckbox(props);

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

// export function UserTypeSelectButtons({options}) {
//     if (!options) options = ["I'm a Student", "I'm a Professor"];

//   const { value, getRadioProps } = useRadioGroup({
//     defaultValue: null,
//   })

//   return (
//     <VStack {...options}>
//       {options.map((value) => {
//         const option = getRadioProps({ value })
//         return (
//           <MultiSelectButtons key={value} {...option}>
//             {value}
//           </MultiSelectButtons>
//         )
//       })}
//     </VStack>
//   )
// }

// export function CourseMultiSelect({options}) {
//   if (!options) options = ["CPSC 455", "CPSC 310", "CPSC 221"];

//   const { value, getCheckboxProps } = useCheckboxGroup({
//     defaultValue: ['react'],
//   })

//   return (
//     <HStack {...options}>
//       {options.map((value) => {
//         const option = getCheckboxProps({ value })
//         return (
//           <MultiSelectButtons key={value} {...option}>
//             {value}
//           </MultiSelectButtons>
//         )
//       })}
//     </HStack>
//   )
// }