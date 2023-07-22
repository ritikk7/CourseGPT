import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  ModalHeader,
} from '@chakra-ui/react';
import { updateUser } from '../../../../redux/userSlice';

const ProfileSecuritySettings = ({ handleClose }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSave = () => {
    // validate old password
    if (user.password !== oldPassword) {
      console.log(user.password);
      alert('Your old password is incorrect.');
      return;
    }

    // validate new passwords match
    if (newPassword !== confirmPassword) {
      alert('Your new passwords do not match.');
      return;
    }

    const updatedUser = {
      password: newPassword,
    };

    dispatch(updateUser(updatedUser));
    handleClose();
  };

  return (
    <Box w="600px" color="white">
      <ModalHeader>Security Settings</ModalHeader>
      <FormControl mt={4} paddingInlineStart={6}>
        <FormLabel>Old Password</FormLabel>
        <Input
          type="password"
          value={oldPassword}
          onChange={e => setOldPassword(e.target.value)}
        />
      </FormControl>
      <FormControl mt={4} paddingInlineStart={6}>
        <FormLabel>New Password</FormLabel>
        <Input
          type="password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
        />
      </FormControl>
      <FormControl mt={4} paddingInlineStart={6}>
        <FormLabel>Confirm New Password</FormLabel>
        <Input
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
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

export default ProfileSecuritySettings;
