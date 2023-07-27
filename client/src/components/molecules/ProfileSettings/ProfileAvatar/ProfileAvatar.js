import React from 'react';

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  ModalFooter,
  ModalHeader,
  SimpleGrid,
} from '@chakra-ui/react';
import { updateUser } from '../../../../redux/userSlice';
import { useDispatch } from 'react-redux';

const avatarImages = ['./assets/cat.jpg'];

const ProfileAvatar = ({ handleClose }) => {
  const dispatch = useDispatch();

  const handleSave = () => {
    const updatedUser = {};
    dispatch(updateUser(updatedUser));
    handleClose();
  };

  return (
    <Box w="600px" color="white">
      <ModalHeader>Profile Avatar</ModalHeader>
      <FormControl paddingInlineStart={6}>
        <FormLabel>Avatars</FormLabel>
        <SimpleGrid minChildWidth="120px" spacing="7px">
          {avatarImages.map(image => (
            <Image
              borderRadius="full"
              boxSize="72px"
              src={image || ''}
              mx={4}
            />
          ))}
        </SimpleGrid>
      </FormControl>
      <ModalFooter paddingInlineEnd={0} paddingTop={6}>
        <Button colorScheme="blue" mr={3} onClick={handleSave}>
          Save
        </Button>
        <Button colorScheme="red" onClick={handleClose}>
          Cancel
        </Button>
      </ModalFooter>
    </Box>
  );
};

export default ProfileAvatar;
