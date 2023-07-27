import React, { useState } from 'react';
import styles from './ProfileAvatar.module.css';
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

const Avatar = {
  Cat: './assets/cat.png',
  Earth: './assets/earth.jpeg',
  Man: './assets/man.png',
  Pup: './assets/pup.png',
  Robot: './assets/robot.png',
  Woman: './assets/woman.png',
};

const avatarImages = [
  Avatar.Cat,
  Avatar.Earth,
  Avatar.Man,
  Avatar.Pup,
  Avatar.Robot,
  Avatar.Woman,
];

const ProfileAvatar = ({ handleClose }) => {
  const dispatch = useDispatch();

  const [selectedAvatar, setSelectedAvatar] = useState('');

  const handleSave = () => {
    const updatedUser = { profilePicture: selectedAvatar };
    dispatch(updateUser(updatedUser));
    handleClose();
  };

  return (
    <Box w="600px" color="white">
      <ModalHeader>Profile Avatar Settings</ModalHeader>
      <FormControl paddingInlineStart={6}>
        <FormLabel>Choose your profile avatar</FormLabel>
        <SimpleGrid columns={4}>
          {avatarImages.map((image, index) => (
            <div
              className={styles.btn}
              style={
                selectedAvatar === image ? { backgroundColor: 'black' } : null
              }
              onClick={() => setSelectedAvatar(image)}
            >
              <Image
                key={index}
                borderRadius="full"
                boxSize="92px"
                src={image || ''}
                mx="auto"
                my={4}
              />
            </div>
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
