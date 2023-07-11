import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  FormControl,
  FormLabel,
  Image,
  ModalFooter,
  ModalHeader,
  Stack,
} from '@chakra-ui/react';
import { updateUser } from '../../../../redux/userSlice';

const ProfileUserSettings = ({ handleClose }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const [userInfo, setUserInfo] = useState({
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    type: user.type,
  });

  const handleSave = () => {
    const updatedUser = {
      ...userInfo,
    };
    dispatch(updateUser(updatedUser));
    handleClose();
  };

  return (
    <Box w="600px">
      <ModalHeader> User Settings </ModalHeader>
      <Stack direction="row">
        <Box w="350px" mt={6} >
          <Image
            borderRadius="full"
            boxSize="180px"
            src="https://soccerpointeclaire.com/wp-content/uploads/2021/06/default-profile-pic-e1513291410505.jpg"
            alt="Profile Picture"
          />
        </Box>
        <Box w="100%">
          <Flex direction="row" spacing={5}>
            <FormControl m={4}>
              <FormLabel>First name</FormLabel>
              <Editable
                color={'white'}
                backgroundColor={'teal.600'} borderRadius={10}
                defaultValue={userInfo.firstName}
                onSubmit={value =>
                  setUserInfo({ ...userInfo, firstName: value })
                }
              >
                <EditablePreview px={2}/>
                <EditableInput borderRadius={10} px={2}/>
              </Editable>
            </FormControl>
            <FormControl m={4}>
              <FormLabel>Last name</FormLabel>
              <Editable
                color={'white'}
                backgroundColor={'teal.600'} borderRadius={10}
                defaultValue={userInfo.lastName}
                onSubmit={value =>
                  setUserInfo({ ...userInfo, lastName: value })
                }
              >
                <EditablePreview px={2}/>
                <EditableInput borderRadius={10} px={2}/>
              </Editable>
            </FormControl>
          </Flex>
          <FormControl m={4} mt={0}>
            <FormLabel>Email address</FormLabel>
            <Editable
              color={'white'}
              backgroundColor={'teal.600'} borderRadius={10}
              defaultValue={userInfo.email}
              onSubmit={value => setUserInfo({ ...userInfo, email: value })}
            >
              <EditablePreview px={2}/>
              <EditableInput borderRadius={10} px={2}/>
            </Editable>
          </FormControl>
          <FormControl m={4}>
            <FormLabel>Account Type</FormLabel>
            <Editable
              color={'white'}
              backgroundColor={'teal.600'} borderRadius={10}
              defaultValue={userInfo.type}
            >
              <EditablePreview px={2}/>
              <EditableInput px={2}/>
            </Editable>
          </FormControl>
        </Box>
      </Stack>
      <ModalFooter paddingInlineEnd={0} paddingTop={6}>
        <Button colorScheme="blue" mr={3} onClick={handleSave}>
          Save
        </Button>
        <Button colorScheme="red" onClick={handleClose}>Cancel</Button>
      </ModalFooter>
    </Box>
  );
};

export default ProfileUserSettings;
