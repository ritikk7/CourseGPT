import React, { useState } from 'react';
import { Box, Button, Input, FormControl, FormLabel } from "@chakra-ui/react";
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/authSlice';
import {useNavigate} from "react-router-dom";

function Login() {
    const dispatch = useDispatch();
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await dispatch(loginUser(credentials));
        if (response.payload) {
            navigate('/login-success');
        } else {
            // TODO error
        }
    }

    const handleGoogleLogin = () => window.location.href = 'http://localhost:3001/api/auth/google';
    const navigateToRegister = () => navigate('/register');

    return (
        <Box>
            <form onSubmit={handleSubmit}>
                <FormControl id="email" isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input name='email' type='text' placeholder='Email' onChange={handleChange} />
                </FormControl>
                <FormControl id="password" isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input name='password' type='password' placeholder='Password' onChange={handleChange} />
                </FormControl>
                <Button mt={4} type='submit' colorScheme="teal">Login</Button>
            </form>
            <Button mt={4} onClick={handleGoogleLogin} colorScheme="red">Login with Google</Button>
            <Button mt={4} onClick={navigateToRegister} colorScheme="blue">Don't have an account? Create one!</Button>
        </Box>
    );
}

export default Login;

// https://reactrouter.com/en/main/hooks/use-navigate
