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
  Stack,
  useTheme,
} from '@chakra-ui/react';
import { updateUser } from '../../../../redux/userSlice';

const ProfileUserSettings = ({ handleClose }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [selectedFile, setSelectedFile] = useState(null);

  const [userInfo, setUserInfo] = useState({
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    type: user.type,
    profilePicture: user.profilePicture,
  });

  const handleSave = () => {
    const updatedUser = {
      ...userInfo,
      profilePicture: selectedFile,
    };
    dispatch(updateUser(updatedUser));
    handleClose();
  };

  const handleFileChange = e => {
    setSelectedFile(URL.createObjectURL(e.target.files[0]));
  };

  const theme = useTheme();
  return (
    <Box
      color={theme.colors.textSecondary.light}
      w="600px"
      bg={theme.colors.background.light}
    >
      <ModalHeader color={theme.colors.primary.light}>
        {' '}
        User Settings{' '}
      </ModalHeader>
      <Stack direction="row">
        <Box
          w="400px"
          m={1}
          justifyContent="center"
          bg={theme.colors.tertiary.light}
        >
          <Image
            borderRadius="full"
            boxSize="180px"
            src={
              selectedFile ||
              userInfo.profilePicture ||
              'https://soccerpointeclaire.com/wp-content/uploads/2021/06/default-profile-pic-e1513291410505.jpg'
            }
            alt="Profile Picture"
            m={3}
          />
          <Input
            id="fileUpload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <FormLabel
            m={6}
            htmlFor="fileUpload"
            style={{
              fontSize: '0.9em',
              display: 'inline-block',
              backgroundColor: theme.colors.button.light,
              color: theme.colors.button.textBase,
              padding: '8px',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Upload Profile Picture
          </FormLabel>
        </Box>
        <Box w="100%">
          <Flex direction="row" spacing={5}>
            <FormControl m={4}>
              <FormLabel color={theme.colors.textPrimary.light}>
                First name
              </FormLabel>
              <Editable
                backgroundColor={theme.colors.tertiary.light}
                borderRadius={10}
                defaultValue={userInfo.firstName}
                onSubmit={value =>
                  setUserInfo({ ...userInfo, firstName: value })
                }
              >
                <EditablePreview px={2} />
                <EditableInput borderRadius={10} px={2} />
              </Editable>
            </FormControl>
            <FormControl m={4}>
              <FormLabel color={theme.colors.textPrimary.light}>
                Last name
              </FormLabel>
              <Editable
                backgroundColor={theme.colors.tertiary.light}
                borderRadius={10}
                defaultValue={userInfo.lastName}
                onSubmit={value =>
                  setUserInfo({ ...userInfo, lastName: value })
                }
              >
                <EditablePreview px={2} />
                <EditableInput borderRadius={10} px={2} />
              </Editable>
            </FormControl>
          </Flex>
          <FormControl m={4} mt={0}>
            <FormLabel color={theme.colors.textPrimary.light}>
              Email address
            </FormLabel>
            <Editable
              backgroundColor={theme.colors.tertiary.light}
              borderRadius={10}
              defaultValue={userInfo.email}
              onSubmit={value => setUserInfo({ ...userInfo, email: value })}
            >
              <EditablePreview px={2} />
              <EditableInput borderRadius={10} px={2} />
            </Editable>
          </FormControl>
          <FormControl m={4}>
            <FormLabel color={theme.colors.textPrimary.light}>
              Account Type
            </FormLabel>
            <Editable
              backgroundColor={theme.colors.tertiary.light}
              borderRadius={10}
              defaultValue={userInfo.type}
            >
              <EditablePreview px={2} />
              <EditableInput px={2} />
            </Editable>
          </FormControl>
        </Box>
      </Stack>
      <ModalFooter paddingInlineEnd={0} paddingTop={0}>
        <Button
          colorScheme="blue"
          mr={3}
          onClick={handleSave}
          bg={theme.colors.button.light}
          _hover={{ bg: theme.colors.button.hover }}
        >
          Save
        </Button>
        <Button
          colorScheme="red"
          onClick={handleClose}
          bg={theme.colors.error.light}
        >
          Cancel
        </Button>
      </ModalFooter>
    </Box>
  );
};

export default ProfileUserSettings;
