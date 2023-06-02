import React, {useEffect, useState} from 'react';
import {Box, Button, Input, FormControl, FormLabel, AlertIcon, Alert} from '@chakra-ui/react';
import {useDispatch, useSelector} from 'react-redux';
import {registerUser} from '../../redux/authSlice';
import {useNavigate} from 'react-router-dom';
import {baseUrl} from "../../api/axiosInstance";

function Register() {
    const dispatch = useDispatch();
    const [credentials, setCredentials] = useState({email: '', password: '', firstName: '', lastName: ''});
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user);
    const error = useSelector(state => state.auth.error);

    const handleChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser(credentials));
    }

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleGoogleLogin = () => window.location.href = baseUrl + '/auth/google';
    const navigateToLogin = () => navigate('/login');

    return (
        <Box>
            {error && (
                <Alert status="error">
                    <AlertIcon/>
                    {error}
                </Alert>
            )}
            <form onSubmit={handleSubmit}>
                <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input name="firstName" type="text" placeholder="First Name" onChange={handleChange}/>
                </FormControl>
                <FormControl id="lastName" isRequired>
                    <FormLabel>Last Name</FormLabel>
                    <Input name="lastName" type="text" placeholder="Last Name" onChange={handleChange}/>
                </FormControl>
                <FormControl id="email" isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input name="email" type="text" placeholder="Email" onChange={handleChange}/>
                </FormControl>
                <FormControl id="password" isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input name="password" type="password" placeholder="Password" onChange={handleChange}/>
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
    )
}

export default Register;


// https://reactrouter.com/en/main/hooks/use-navigate
