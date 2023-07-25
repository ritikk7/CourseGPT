import React, { useEffect, useState } from 'react';
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  useTheme,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, setAuthError } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../api/axiosInstance';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { FaGoogle } from 'react-icons/fa';

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const authError = useSelector(state => state.auth.error);

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = e => {
    if (authError) dispatch(setAuthError(null));
    setCredentials(state => ({ ...state, [e.target.name]: e.target.value }));
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (authError) dispatch(setAuthError(null));
    dispatch(registerUser(credentials));
  };
  const handleGoogleLogin = () => {
    if (authError) dispatch(setAuthError(null));
    window.location.href = baseUrl + '/auth/google';
  };
  const navigateToLogin = () => {
    if (authError) dispatch(setAuthError(null));
    navigate('/login');
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const theme = useTheme();

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={theme.colors.background.light}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} color={theme.colors.textSecondary.light}>
            Sign up for an account
          </Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={theme.colors.background.dark}
          boxShadow={'lg'}
          p={8}
        >
          {authError && (
            <Alert
              status="error"
              mb={5}
              bg={theme.colors.error.light}
              color={theme.colors.textPrimary.light}
            >
              <AlertIcon />
              {authError}
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel color={theme.colors.formLabel.light}>
                      First Name
                    </FormLabel>
                    <Input
                      name="firstName"
                      type="text"
                      color={theme.colors.textSecondary.light}
                      bg={theme.colors.tertiary.light}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel color={theme.colors.formLabel.light}>
                      Last Name
                    </FormLabel>
                    <Input
                      name="lastName"
                      type="text"
                      color={theme.colors.textSecondary.light}
                      bg={theme.colors.tertiary.light}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel color={theme.colors.formLabel.light}>
                  Email
                </FormLabel>
                <Input
                  name="email"
                  type="text"
                  color={theme.colors.textSecondary.light}
                  bg={theme.colors.tertiary.light}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel color={theme.colors.formLabel.light}>
                  Password
                </FormLabel>
                <InputGroup>
                  <Input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    color={theme.colors.textSecondary.light}
                    bg={theme.colors.tertiary.light}
                    onChange={handleChange}
                  />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword(showPassword => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={2}>
                <Button
                  bg={theme.colors.button.light}
                  color={theme.colors.textPrimary.light}
                  _hover={{
                    bg: theme.colors.button.hover,
                    color: theme.colors.textPrimary.light,
                  }}
                  type="submit"
                >
                  Register
                </Button>
                <Text align="center" color={theme.colors.textSecondary.light}>
                  or
                </Text>
                <Button
                  bg={theme.colors.loginWithGoogle.light}
                  color={theme.colors.textPrimary.light}
                  _hover={{
                    bg: theme.colors.loginWithGoogle.hover,
                    color: theme.colors.textPrimary.light,
                  }}
                  onClick={handleGoogleLogin}
                  leftIcon={<FaGoogle />}
                >
                  Register with Google
                </Button>
              </Stack>
            </Stack>
          </form>
          <Stack justify="center" mt={4}>
            <Text align={'center'} color={theme.colors.textSecondary.light}>
              Already have an account?{' '}
              <Link onClick={navigateToLogin} color={theme.colors.link.hover}>
                Login!
              </Link>
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}



/**
 * Majority of code written by team.
 * The visual component structure was copied and adapted from:
 * - https://chakra-templates.dev/forms/authentication
 *
 * Helped with understanding:
 * - https://reactrouter.com/en/main/hooks/use-navigate
 * - Stack Overflow / Google
 * - Chakra docs
 * - Redux docs
 */
