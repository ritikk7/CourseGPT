import React, {useEffect, useState} from 'react';
import {Box, Button, Input, FormControl, FormLabel, Alert, AlertIcon} from '@chakra-ui/react';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser} from '../../redux/authSlice';
import {useNavigate} from 'react-router-dom';
import {baseUrl} from "../../api/axiosInstance";

function Login() {
    const dispatch = useDispatch();
    const [credentials, setCredentials] = useState({email: '', password: ''});
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user);
    const error = useSelector(state => state.auth.error);
    const handleChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(credentials));
    };

    const handleGoogleLogin = () => (window.location.href = baseUrl + '/auth/google');
    const navigateToRegister = () => navigate('/register');

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    return (
        <Box>
            {error && (
                <Alert status="error">
                    <AlertIcon/>
                    {error}
                </Alert>
            )}
            <form onSubmit={handleSubmit}>
                <FormControl id="email" isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input
                        name="email"
                        type="text"
                        placeholder="Email"
                        onChange={handleChange}
                    />
                </FormControl>
                <FormControl id="password" isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={handleChange}
                    />
                </FormControl>
                <Button mt={4} type="submit" colorScheme="teal">
                    Login
                </Button>
            </form>
            <Button
                mt={4}
                onClick={handleGoogleLogin}
                colorScheme="red"
            >
                Login with Google
            </Button>
            <Button
                mt={4}
                onClick={navigateToRegister}
                colorScheme="blue"
            >
                Don't have an account? Create one!
            </Button>
        </Box>
    );
}

export default Login;
