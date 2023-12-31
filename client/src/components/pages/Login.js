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
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  useTheme,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, setAuthError } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../api/axiosInstance';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { FaGoogle } from 'react-icons/fa';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const authError = useSelector(state => state.auth.error);

  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = e => {
    if (authError) dispatch(setAuthError(null));
    setCredentials(state => ({ ...state, [e.target.name]: e.target.value }));
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (authError) dispatch(setAuthError(null));
    dispatch(loginUser(credentials));
  };
  const handleGoogleLogin = () => {
    if (authError) dispatch(setAuthError(null));
    window.location.href = baseUrl + '/auth/google';
  };
  const navigateToRegister = () => {
    if (authError) dispatch(setAuthError(null));
    navigate('/register');
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
      bg={theme.colors.loginAndReg.mainBackground}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} color={theme.colors.loginAndReg.text}>
            Sign in to your account
          </Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={theme.colors.loginAndReg.boxBackground}
          boxShadow={'lg'}
          p={8}
        >
          {authError && (
            <Alert
              status="error"
              mb={5}
              bg={theme.colors.error.light}
              color={theme.colors.loginAndReg.text}
            >
              <AlertIcon />
              {authError}
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl id="email" isRequired>
                <FormLabel color={theme.colors.loginAndReg.text}>
                  Email address
                </FormLabel>
                <Input
                  name="email"
                  type="email"
                  color={theme.colors.loginAndReg.text}
                  bg={theme.colors.loginAndReg.inputBackground}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel color={theme.colors.loginAndReg.text}>
                  Password
                </FormLabel>
                <InputGroup>
                  <Input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    color={theme.colors.loginAndReg.text}
                    bg={theme.colors.loginAndReg.inputBackground}
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
                  bg={theme.colors.loginAndReg.loginOrRegisterButton.base}
                  color={theme.colors.textPrimary.light}
                  _hover={{
                    bg: theme.colors.loginAndReg.loginOrRegisterButton.hover,
                    color: theme.colors.textPrimary.light,
                  }}
                  type="submit"
                >
                  Sign in
                </Button>
                <Text align="center" color={theme.colors.loginAndReg.text}>
                  or
                </Text>

                <Button
                  bg={theme.colors.loginAndReg.loginWithGoogleButton.base}
                  color={theme.colors.textPrimary.light}
                  _hover={{
                    bg: theme.colors.loginAndReg.loginWithGoogleButton.hover,
                    color: theme.colors.textPrimary.light,
                  }}
                  onClick={handleGoogleLogin}
                  leftIcon={<FaGoogle />}
                >
                  Login with Google
                </Button>
              </Stack>
            </Stack>
          </form>
          <Stack justify="center" mt={4}>
            <Text align={'center'} color={theme.colors.loginAndReg.text}>
              Don't have an account?{' '}
              <Link
                onClick={navigateToRegister}
                color={theme.colors.loginAndReg.link.hover}
              >
                Create one!
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
