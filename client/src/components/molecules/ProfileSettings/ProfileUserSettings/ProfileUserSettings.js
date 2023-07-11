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
  Input,
  ModalFooter,
  ModalHeader,
  Select,
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
        <Box w="300px">
          <Image
            borderRadius="full"
            boxSize="150px"
            src="https://soccerpointeclaire.com/wp-content/uploads/2021/06/default-profile-pic-e1513291410505.jpg"
            alt="Profile Picture"
          />
        </Box>
        <Box w="100%">
          <Flex direction="row" spacing={4}>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Editable
                defaultValue={userInfo.firstName}
                onSubmit={value =>
                  setUserInfo({ ...userInfo, firstName: value })
                }
              >
                <EditablePreview />
                <EditableInput />
              </Editable>
            </FormControl>
            <FormControl>
              <FormLabel>Last name</FormLabel>
              <Editable
                defaultValue={userInfo.lastName}
                onSubmit={value =>
                  setUserInfo({ ...userInfo, lastName: value })
                }
              >
                <EditablePreview />
                <EditableInput />
              </Editable>
            </FormControl>
          </Flex>
          <FormControl>
            <FormLabel>Email address</FormLabel>
            <Editable
              defaultValue={userInfo.email}
              onSubmit={value => setUserInfo({ ...userInfo, email: value })}
            >
              <EditablePreview />
              <EditableInput />
            </Editable>
          </FormControl>
          <FormControl>
            <FormLabel>Account Type</FormLabel>
            <Select
              value={userInfo.type}
              onChange={e => setUserInfo({ ...userInfo, type: e.target.value })}
            >
              <option value="Student">Student</option>
              <option value="Professor">Teacher</option>
              <option value="Admin">Admin</option>
              <option value="Developer">Developer</option>
            </Select>
          </FormControl>
        </Box>
      </Stack>
      <ModalFooter>
        <Button colorScheme="blue" mr={3} onClick={handleSave}>
          Save
        </Button>
        <Button onClick={handleClose}>Cancel</Button>
      </ModalFooter>
    </Box>
  );
};

export default ProfileUserSettings;
