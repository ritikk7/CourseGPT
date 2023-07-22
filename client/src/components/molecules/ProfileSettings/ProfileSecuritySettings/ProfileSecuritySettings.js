import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  ModalHeader,
} from '@chakra-ui/react';
import { updatePassword } from '../../../../redux/authSlice';

const ProfileSecuritySettings = ({ handleClose }) => {
  const dispatch = useDispatch();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleSave = async () => {
    // validate new passwords match
    if (newPassword !== confirmPassword) {
      setValidationError('New passwords do not match');
      return;
    } else {
      setValidationError('');
    }

    const actionResult = await dispatch(
      updatePassword({
        oldPassword,
        newPassword,
        confirmPassword,
      })
    );

    if (updatePassword.rejected.match(actionResult)) {
      setValidationError(
        actionResult.error.message || 'Unable to update password'
      );
      return;
    }

    handleClose();
  };

  return (
    <Box w="600px" color="white">
      <ModalHeader>Security Settings</ModalHeader>
      {validationError && (
        <Alert status="error">
          <AlertIcon />
          {validationError}
        </Alert>
      )}
      <FormControl mt={3} paddingInlineStart={6}>
        <FormLabel>Old Password</FormLabel>
        <Input
          type="password"
          value={oldPassword}
          onChange={e => setOldPassword(e.target.value)}
        />
      </FormControl>
      <FormControl mt={3} paddingInlineStart={6}>
        <FormLabel>New Password</FormLabel>
        <Input
          type="password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
        />
      </FormControl>
      <FormControl mt={3} paddingInlineStart={6}>
        <FormLabel>Confirm New Password</FormLabel>
        <Input
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
      </FormControl>
      <ModalFooter paddingInlineEnd={0} paddingTop={5}>
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
