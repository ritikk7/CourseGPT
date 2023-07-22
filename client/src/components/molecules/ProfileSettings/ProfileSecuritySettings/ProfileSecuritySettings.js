import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  Text,
} from '@chakra-ui/react';
import { updatePassword } from '../../../../redux/authSlice';

const ProfileSecuritySettings = ({ handleClose }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleSave = async () => {
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

  if (user.googleId !== null) {
    return (
      <Box w="600px" color="white">
        <ModalHeader>Security Settings</ModalHeader>
        <Text mt={3} paddingInlineStart={6}>
          You're logged in with Google. To change your password, please visit
          your
          <a
            href="https://myaccount.google.com/intro/signinoptions/password"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'blue',
              textDecoration: 'none',
            }}
            onMouseEnter={e => (e.target.style.textDecoration = 'underline')}
            onMouseLeave={e => (e.target.style.textDecoration = 'none')}
          >
            {' '}
            Google account settings
          </a>
          .
        </Text>
        <ModalFooter paddingInlineEnd={0} paddingTop={5}>
          <Button colorScheme="red" onClick={handleClose}>
            Close
          </Button>
        </ModalFooter>
      </Box>
    );
  }

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
