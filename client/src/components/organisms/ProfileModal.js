import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { Button, Box, VStack, Image, Input, Text, Stack, Select, FormControl, FormLabel, Modal, ModalOverlay, ModalContent, ModalFooter, ModalCloseButton } from '@chakra-ui/react';
import { updateUser } from "../../redux/userSlice";

const ProfileModal = ({isOpen, handleClose}) => {
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [accountType, setAccountType] = useState('');

    const handleSave = () => {
        const updatedUser = {
            firstName,
            lastName,
            email,
            accountType,
        };
        dispatch(updateUser(updatedUser));
        handleClose();
    }

    return (
      <Modal isOpen={isOpen} onClose={handleClose} size="xl">
          <ModalOverlay/>
          <ModalContent>
              <VStack spacing="5" width="100%" padding="5">
                  <Text fontSize="3xl" fontWeight="bold">
                      Edit Profile Settings
                  </Text>
                  <Box boxSize='150px'>
                      <Image
                        borderRadius='full'
                        boxSize='150px'
                        src='https://soccerpointeclaire.com/wp-content/uploads/2021/06/default-profile-pic-e1513291410505.jpg'
                        alt='Profile Picture'
                      />
                  </Box>
                  <Stack spacing="5" width="100%">
                      <FormControl>
                          <FormLabel>First Name</FormLabel>
                          <Input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} />
                      </FormControl>
                      <FormControl>
                          <FormLabel>Last Name</FormLabel>
                          <Input type="text" value={lastName} onChange={e => setLastName(e.target.value)} />
                      </FormControl>
                      <FormControl>
                          <FormLabel>Email</FormLabel>
                          <Input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                      </FormControl>
                      <FormControl>
                          <FormLabel>Account Type</FormLabel>
                          <Select placeholder="Select account type" value={accountType} onChange={e => setAccountType(e.target.value)} >
                              <option value="student">Student</option>
                              <option value="professor">Professor</option>
                              <option value="developer">Developer</option>
                              <option value="admin">Admin</option>
                          </Select>
                      </FormControl>
                  </Stack>
              </VStack>
              <ModalCloseButton mt={2} size={"lg"}/>
              <ModalFooter>
                  <Button onClick={handleSave}>
                      Save
                  </Button>
              </ModalFooter>
          </ModalContent>
      </Modal>
    );
};

export default ProfileModal;
