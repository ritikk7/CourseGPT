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
  useTheme,
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

  const theme = useTheme();

  if (user.googleId !== null) {
    return (
      <Box w="600px" color={theme.colors.profileModal.mainTextColor}>
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
          <Button
            color={theme.colors.button.text}
            bg={theme.colors.buttonCancel.light}
            _hover={{ bg: theme.colors.buttonCancel.hover }}
            onClick={handleClose}
          >
            Close
          </Button>
        </ModalFooter>
      </Box>
    );
  }

  return (
    <Box w="600px" color={theme.colors.profileModal.mainTextColor}>
      <ModalHeader>Security Settings</ModalHeader>
      {validationError && (
        <Alert status="error">
          <AlertIcon />
          {validationError}
        </Alert>
      )}
      <FormControl mt={3} paddingInlineStart={6}>
        <FormLabel color={theme.colors.profileModal.mainFormLabelColor}>
          Old Password
        </FormLabel>
        <Input
          type="password"
          value={oldPassword}
          onChange={e => setOldPassword(e.target.value)}
          color={theme.colors.profileModal.mainTextColor}
        />
      </FormControl>
      <FormControl mt={3} paddingInlineStart={6}>
        <FormLabel color={theme.colors.profileModal.mainFormLabelColor}>
          New Password
        </FormLabel>
        <Input
          type="password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          color={theme.colors.profileModal.mainTextColor}
        />
      </FormControl>
      <FormControl mt={3} paddingInlineStart={6}>
        <FormLabel color={theme.colors.profileModal.mainFormLabelColor}>
          Confirm New Password
        </FormLabel>
        <Input
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          color={theme.colors.profileModal.mainTextColor}
        />
      </FormControl>
      <ModalFooter
        paddingInlineEnd={0}
        paddingTop={5}
        color={theme.colors.button.text}
      >
        <Button
          bg={theme.colors.button.light}
          color={theme.colors.button.text}
          _hover={{ bg: theme.colors.button.hover }}
          mr={3}
          onClick={handleSave}
        >
          Save
        </Button>
        <Button
          bg={theme.colors.buttonCancel.light}
          color={theme.colors.button.text}
          _hover={{ bg: theme.colors.buttonCancel.hover }}
          onClick={handleClose}
        >
          Cancel
        </Button>
      </ModalFooter>
    </Box>
  );
};

export default ProfileSecuritySettings;
