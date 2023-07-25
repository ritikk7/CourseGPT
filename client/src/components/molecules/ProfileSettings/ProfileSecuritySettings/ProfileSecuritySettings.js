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
  Link,
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
      <Box
        w="600px"
        color={theme.colors.textPrimary.light}
        bg={theme.colors.background.light}
      >
        <ModalHeader color={theme.colors.primary.light}>
          Security Settings
        </ModalHeader>
        <Text mt={3} paddingInlineStart={6}>
          You're logged in with Google. To change your password, please visit
          your
          <Link
            href="https://myaccount.google.com/intro/signinoptions/password"
            target="_blank"
            rel="noopener noreferrer"
            color={theme.colors.link.light}
            _hover={{ color: theme.colors.link.hover }}
          >
            {' '}
            Google account settings
          </Link>
          .
        </Text>
        <ModalFooter paddingInlineEnd={0} paddingTop={5}>
          <Button
            bg={theme.colors.error.light}
            _hover={{ bg: theme.colors.error.light }}
            onClick={handleClose}
          >
            Close
          </Button>
        </ModalFooter>
      </Box>
    );
  }

  return (
    <Box
      w="600px"
      color={theme.colors.textPrimary.light}
      bg={theme.colors.background.light}
    >
      <ModalHeader color={theme.colors.primary.light}>
        Security Settings
      </ModalHeader>
      {validationError && (
        <Alert status="error" bg={theme.colors.error.light}>
          <AlertIcon color={theme.colors.textPrimary.light} />
          {validationError}
        </Alert>
      )}
      <FormControl mt={3} paddingInlineStart={6}>
        <FormLabel color={theme.colors.formLabel.light}>Old Password</FormLabel>
        <Input
          type="password"
          value={oldPassword}
          onChange={e => setOldPassword(e.target.value)}
        />
      </FormControl>
      <FormControl mt={3} paddingInlineStart={6}>
        <FormLabel color={theme.colors.formLabel.light}>New Password</FormLabel>
        <Input
          type="password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
        />
      </FormControl>
      <FormControl mt={3} paddingInlineStart={6}>
        <FormLabel color={theme.colors.formLabel.light}>
          Confirm New Password
        </FormLabel>
        <Input
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
      </FormControl>
      <ModalFooter paddingInlineEnd={0} paddingTop={5}>
        <Button
          bg={theme.colors.button.light}
          _hover={{ bg: theme.colors.button.hover }}
          onClick={handleSave}
        >
          Save
        </Button>
        <Button
          bg={theme.colors.error.light}
          _hover={{ bg: theme.colors.error.light }}
          onClick={handleClose}
        >
          Cancel
        </Button>
      </ModalFooter>
    </Box>
  );
};

export default ProfileSecuritySettings;
