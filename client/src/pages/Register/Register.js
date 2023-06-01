import React, { useState } from 'react';
import { Box, Button, Input, FormControl, FormLabel } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: '', password: '', firstName: '', lastName: '' });

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await dispatch(registerUser(credentials));
        if (response.payload) {
            navigate('/login-success');
        } else {
            // TODO error
        }
    };

    const handleGoogleLogin = () => (window.location.href = 'http://localhost:3001/api/auth/google');
    const navigateToLogin = () => navigate('/login');

    return (
        <Box>
            <form onSubmit={handleSubmit}>
                <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input name="firstName" type="text" placeholder="First Name" onChange={handleChange} />
                </FormControl>
                <FormControl id="lastName" isRequired>
                    <FormLabel>Last Name</FormLabel>
                    <Input name="lastName" type="text" placeholder="Last Name" onChange={handleChange} />
                </FormControl>
                <FormControl id="email" isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input name="email" type="text" placeholder="Email" onChange={handleChange} />
                </FormControl>
                <FormControl id="password" isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input name="password" type="password" placeholder="Password" onChange={handleChange} />
                </FormControl>
                <Button mt={4} type="submit" colorScheme="teal">
                    Register
                </Button>
            </form>
            <Button mt={4} onClick={handleGoogleLogin} colorScheme="red">
                Register with Google
            </Button>
            <Button mt={4} onClick={navigateToLogin} colorScheme="blue">
                Already have an account? Login!
            </Button>
        </Box>
    );
}

export default Register;


// https://reactrouter.com/en/main/hooks/use-navigate
