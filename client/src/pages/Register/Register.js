import React, { useEffect, useState } from 'react';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    Alert,
    AlertIcon,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from "../../api/axiosInstance";

export default function Register() {
    const dispatch = useDispatch();
    const [credentials, setCredentials] = useState({ email: '', password: '', firstName: '', lastName: '' });
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user);
    const error = useSelector(state => state.auth.error);

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser(credentials));
    };

    const handleGoogleLogin = () => (window.location.href = baseUrl + '/auth/google');
    const navigateToLogin = () => navigate('/login');

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={'gray.800'}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} color={'white'}>
                        Create an account
                    </Heading>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={'gray.700'}
                    boxShadow={'lg'}
                    p={8}>
                    {error && (
                        <Alert status="error">
                            <AlertIcon />
                            {error}
                        </Alert>
                    )}
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={4}>
                            <FormControl id="firstName" isRequired>
                                <FormLabel color={'white'}>First Name</FormLabel>
                                <Input name="firstName" type="text" color={'white'} onChange={handleChange} />
                            </FormControl>
                            <FormControl id="lastName" isRequired>
                                <FormLabel color={'white'}>Last Name</FormLabel>
                                <Input name="lastName" type="text" color={'white'} onChange={handleChange} />
                            </FormControl>
                            <FormControl id="email" isRequired>
                                <FormLabel color={'white'}>Email</FormLabel>
                                <Input name="email" type="text" color={'white'} onChange={handleChange} />
                            </FormControl>
                            <FormControl id="password" isRequired>
                                <FormLabel color={'white'}>Password</FormLabel>
                                <Input name="password" type="password" color={'white'} onChange={handleChange} />
                            </FormControl>
                            <Stack spacing={2}>
                                <Button
                                    bg={'blue.600'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.700',
                                    }}
                                    type="submit"
                                >
                                    Register
                                </Button>
                                <Text align='center' color={'white'}>
                                    or
                                </Text>
                                <Button
                                    bg={'red.600'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'red.700',
                                    }}
                                    onClick={handleGoogleLogin}
                                >
                                    Register with Google
                                </Button>
                            </Stack>
                        </Stack>
                    </form>
                    <Flex justify="center" mt={4}>
                        <Link onClick={navigateToLogin} fontSize='sm' color={'blue.400'}>
                            Already have an account? Login!
                        </Link>
                    </Flex>
                </Box>
            </Stack>
        </Flex>
    );
}
